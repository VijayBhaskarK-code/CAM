import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, inject, NgModule } from '@angular/core';
import { NgIf } from '@angular/common';
import { Subject, toArray, from, of, pipe, groupBy, mergeMap, reduce, map } from 'rxjs';
import { takeUntil, startWith, tap, delay } from 'rxjs/operators';

import { TemplatePanel } from '../models/template.panel.model';
import { TemplateSection } from '../models/template.section.model';
import { TemplateVersion } from '../models/template.version.model';
import { TemplateSurvey } from '../models/template.survey.model';
import { TemplateSurveyResponse } from '../models/template.survey.response.model';
import { SurveyChildResponse, GroupSurveyChildResponse } from '../models/template.survey.child.response.model';
import { TemplateField, GroupTemplateField, SuggestionOptions } from '../models/template.field.model';

import { FormBuilder, FormGroup, FormControl, FormsModule, ReactiveFormsModule, Validators, ValidationErrors } from '@angular/forms';

import { v4 as uuid } from 'uuid';

import { ApiService } from '../service/api.service';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from "primeng/radiobutton";
import { AutoCompleteModule } from 'primeng/autocomplete';
import { SplitterModule } from 'primeng/splitter';
import { AccordionModule } from 'primeng/accordion';
import { TreeModule } from 'primeng/tree';
import { TreeNode } from 'primeng/api';
import { PanelModule } from 'primeng/panel';
import { OverlayModule } from 'primeng/overlay';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'app-template-survey',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    FormsModule,
    FormsModule,
    ReactiveFormsModule,

    ButtonModule,
    InputTextModule,
    RadioButtonModule,
    AutoCompleteModule,
    SplitterModule,
    AccordionModule,
    TreeModule,
    PanelModule,
    OverlayModule
  ],
  // providers: [provideNativeDateAdapter()],
  providers: [],
  templateUrl: './template-survey.component.html',
  styles: [`


`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateSurveyComponent implements OnInit, OnDestroy {
  private destroy = new Subject<void>();

  suggestions: Dictionary = {};
  fieldGroups: FGDictionary = {};

  showFiller = false;
  templateSurveyId!: number;
  templateVersionId!: number;

  templateSurvey!: TemplateSurvey;
  templateVersion!: TemplateVersion;
  templatePanels!: TemplatePanel[];
  templateFields: TemplateField[] = [];
  childTemplateFields: ResponseDictionary = {};

  submitted = false;

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router, private activatedRoute: ActivatedRoute,
    private changeRef: ChangeDetectorRef) {
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(val => {
      this.templateSurveyId = val['surveyId'];
      if (this.templateSurveyId) {
        this.getSuggestions();
        this.getTemplateSurvey(this.templateSurveyId);
      }
    })
  }

  getSuggestions() {
    this.apiService.GetInputTypes()
      .subscribe({
        next: (res) => {
          this.suggestions["InputTypes"] = res;
          this.changeRef.detectChanges();
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

  getTemplateSurvey(id: number) {
    this.apiService.getSurveyById(id)
      .subscribe({
        next: (res) => {
          this.templateSurvey = res;
          if (res.templateVersion != null) {
            this.templateVersionId = res.templateVersion.id;
            this.templateVersion = res.templateVersion;
          }
          this.getTemplateVersion();
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

  getTemplateVersion() {
    this.templateVersion.templatePanels.forEach(tPanel => {
      tPanel.type = 'Panel';
      tPanel.templateSections.forEach(tSection => {
        var removeItems: number[] = [];
        tSection.type = 'Section';

        tSection.templateFields.forEach((tField) => {
          tField.type = 'Field';

          if (tField.suggestions != undefined) {
            tField.suggestionOptions = JSON.parse(tField.suggestions);

            if (tField.suggestionOptions != null && tField.suggestionOptions.source != null) {
              tField.suggestionOptions.items = this.suggestions[tField.suggestionOptions.source];
            }
          }

          if (tField.options != undefined) {
            tField.optionItems = JSON.parse(tField.options);
          }

          if (tField.errorMessages != undefined) {
            tField.validatorErrors = JSON.parse(tField.errorMessages);
            console.log(tField.validatorErrors);
          }

          if (tField.parentFieldId != undefined) {
            var parentField = tSection.templateFields.find(dd => dd.id == tField.parentFieldId);
            if (parentField != null) {
              if (parentField.childTemplateFields == undefined)
                parentField.childTemplateFields = [];
              parentField.groupTemplateFields = [];

              parentField.childTemplateFields.push(tField);
              removeItems.push(tField.id);
            }
          }
        });

        removeItems.forEach((id) => {
          tSection.templateFields = tSection.templateFields.filter(item => item.id != id);
        });

        tSection.templateFields.forEach((tField) => {

          var surveyResponseId = 0;
          if (tField.templateSurveyResponses != undefined && tField.templateSurveyResponses.length > 0) {
            surveyResponseId = tField.templateSurveyResponses[0]?.id;

            if (tField.inputType == 'ARRAY') {
              if (tField.templateSurveyResponses[0].response != null) {
                console.log('ARRAY', tField);

                var groupSurveyChildResponses = JSON.parse(tField.templateSurveyResponses[0].response) as GroupSurveyChildResponse[];
                groupSurveyChildResponses.forEach(gscr => {
                  var groupTemplateField = {} as GroupTemplateField;
                  groupTemplateField.id = gscr.id;
                  groupTemplateField.fields = [] as TemplateField[];

                  gscr.surveyChildResponses.forEach(scr => {
                    var templateField = tField?.childTemplateFields?.find(ctf => ctf.id == scr.templateFieldId);
                    if (templateField != null) {
                      templateField.response = scr.response;
                      groupTemplateField?.fields?.push(templateField);

                      var fieldGroup = this.fb.group({
                        fieldId: [templateField.id],
                        parentFieldId: [tField.id],
                        surveyResponseId: [surveyResponseId],
                        code: [templateField.code],
                        response: [templateField.response],
                      });

                      this.fieldGroups[gscr.id + '_' + templateField.id] = fieldGroup;
                    }
                  });

                  if (tField.groupTemplateFields == null)
                    tField.groupTemplateFields = [] as GroupTemplateField[];

                  tField.groupTemplateFields.push(groupTemplateField);
                });
              }
            }
            else {
              // Assign the saved response to the field.
              tField.response = tField.templateSurveyResponses[0]?.response;

              this.fieldGroups[tField.id] = this.fb.group({
                fieldId: [tField.id],
                surveyResponseId: [surveyResponseId],
                code: [tField.code],
                response: [tField.response],
              });
            }
          }

          var fieldValidators = [] as any[];
          if (tField.required) {
            fieldValidators.push(Validators.required);
          }

          if (tField.maxLength != null && tField.maxLength > 0) {
            fieldValidators.push(Validators.maxLength(tField.maxLength));
          }

          this.fieldGroups[tField.id] = this.fb.group({
            fieldId: [tField.id],
            surveyResponseId: [surveyResponseId],
            code: [tField.code],
            response: [tField.response, fieldValidators],
          });

          this.templateFields.push(tField);
        });
      });
    });

    this.templatePanels = this.templateVersion.templatePanels;
    this.changeRef.detectChanges();
  }

  search(event: AutoCompleteCompleteEvent, suggestions: SuggestionOptions) {
    suggestions.items = [...suggestions.items];
  }

  saveSurvey() {
    if (this.templateSurvey.templateSurveyResponses == undefined)
      this.templateSurvey.templateSurveyResponses = [];

    this.templateFields.forEach(tf => {

      var surveyResponseIndex = this.templateSurvey.templateSurveyResponses.findIndex(sr => sr.templateFieldId == tf.id);

      var surveyResponse = {} as TemplateSurveyResponse;
      if (surveyResponseIndex == -1) {
        surveyResponse.templateSurveyId = this.templateSurveyId;
        surveyResponse.templateFieldId = tf.id;
        surveyResponse.id = 0;

        this.templateSurvey.templateSurveyResponses.push(surveyResponse);
      } else {
        surveyResponse = this.templateSurvey.templateSurveyResponses[surveyResponseIndex];
      }

      if (tf.inputType == 'ARRAY' && surveyResponse != null && tf.groupTemplateFields != null && tf.groupTemplateFields.length > 0) {

        var groupSurveyChildResponses = [] as GroupSurveyChildResponse[];
        tf.groupTemplateFields.forEach(gtf => {
          var groupSurveyChildResponse = {} as GroupSurveyChildResponse;
          groupSurveyChildResponse.id = gtf.id ?? '';

          gtf.fields?.forEach(ctf => {
            var surveyChildResponse = {} as SurveyChildResponse;

            surveyChildResponse.response = this.fieldGroups[gtf.id + '_' + ctf.id].value.response;
            surveyChildResponse.templateFieldId = ctf.id;
            surveyChildResponse.id = ctf.id.toString();

            if (groupSurveyChildResponse.surveyChildResponses == null)
              groupSurveyChildResponse.surveyChildResponses = [] as SurveyChildResponse[];

            groupSurveyChildResponse.surveyChildResponses.push(surveyChildResponse);

            // if (surveyResponse.templateSurveyChildResponses == null)
            //   surveyResponse.templateSurveyChildResponses = [] as TemplateSurveyChildResponse[];

            // var surveyCResponseIndex = surveyResponse.templateSurveyChildResponses?.findIndex(sr => sr.templateFieldId == ctf.id);

            // var surveyCResponse = {} as TemplateSurveyChildResponse;
            // if (surveyCResponseIndex == -1) {
            //   surveyCResponse.templateSurveyResponseId = surveyResponse.id;
            //   surveyCResponse.templateFieldId = ctf.id;
            //   surveyCResponse.id = 0;

            //   surveyResponse.templateSurveyChildResponses?.push(surveyCResponse);
            // } else {
            //   surveyCResponse = surveyResponse.templateSurveyChildResponses[surveyCResponseIndex];
            // }

            // surveyCResponse.response = this.fieldGroups[ctf.id].value.response;


          });

          groupSurveyChildResponses.push(groupSurveyChildResponse);
        });

        surveyResponse.response = JSON.stringify(groupSurveyChildResponses);
      }
      else {
        surveyResponse.response = this.fieldGroups[tf.id].value.response;
      }

    });

    console.log(this.templateSurvey);
    this.apiService.updateTemplateSurvey(this.templateSurvey)
      .subscribe(res => {
        this.getTemplateSurvey(this.templateSurveyId);

        //this.toastService.success({ detail: 'SUCCESS', summary: 'Registration Successful', duration: 3000 });
        //this.templateFieldForm.reset();
        //this.selectTemplateField = res;

        //this.isTemplatePanel = this.isTemplateSection = this.isTemplateField = false;
        //this.getTemplateVersion(this.templateVersionId);
      });
  }

  submitSurvey() {
    this.submitted = true;

    this.templateFields.forEach(tf => {

      if (this.fieldGroups[tf.id].invalid) {

        const errors = Object.entries(
          this.fieldGroups[tf.id].controls['response'].errors || {}
        );
      
        const [key, value] = errors[0];
        if (tf.validatorErrors!=null) {
          tf.validatorError = tf.validatorErrors[key];
        }
        console.log(this.fieldGroups[tf.id].controls['response'].errors, tf, tf.validatorError);
        return;
      }
  
      //console.log(JSON.stringify(this.fieldGroups[tf.id].value, null, 2));
    });

    
    // this.selectTemplateField.code = this.templateFieldForm.value.code;
    // this.selectTemplateField.caption = this.templateFieldForm.value.caption;
    // this.selectTemplateField.order = this.templateFieldForm.value.order;
    // this.selectTemplateField.rowNumber = this.templateFieldForm.value.row;
    // this.selectTemplateField.inputType = this.templateFieldForm.value.inputType;
    // this.selectTemplateField.label = this.templateFieldForm.value.label;
    // this.selectTemplateField.validators = this.templateFieldForm.value.validators;
    // this.selectTemplateField.options = this.templateFieldForm.value.options;
    // this.selectTemplateField.placeholder = this.templateFieldForm.value.placeholder;
    // this.selectTemplateField.errorMessages = this.templateFieldForm.value.errorMessages;
    // this.selectTemplateField.suggestions = this.templateFieldForm.value.suggestions;
    // this.selectTemplateField.maxLength = this.templateFieldForm.value.ma;

    // this.apiService.updateTemplateField(this.selectTemplateField)
    //   .subscribe(res => {
    //     //this.toastService.success({ detail: 'SUCCESS', summary: 'Registration Successful', duration: 3000 });
    //     this.templateFieldForm.reset();
    //     this.selectTemplateField = res;

    //     this.isTemplatePanel = this.isTemplateSection = this.isTemplateField = false;
    //     //this.getTemplateVersion(this.templateVersionId);
    //   });
  }

  cancelSurvey() {
    //this.getTemplateVersion(this.templateVersionId);
  }

  addCustomFieldProperty(templateField: TemplateField) {

    if (templateField.childTemplateFields == null)
      templateField.childTemplateFields = [];

    if (templateField.groupTemplateFields == null)
      templateField.groupTemplateFields = [];

    var customGroupId = uuid();

    var gg: GroupTemplateField = { id: customGroupId, fields: templateField.childTemplateFields };

    templateField.childTemplateFields.forEach(ctField => {

      var fieldGroup = this.fb.group({
        fieldId: [ctField.id],
        parentFieldId: [templateField.id],
        surveyResponseId: [0],
        code: [ctField.code],
        response: [''],
      });

      this.fieldGroups[customGroupId + '_' + ctField.id] = fieldGroup;
    });

    templateField.groupTemplateFields.push(gg);

    this.changeRef.detectChanges();
  }

  addCustomFields(templateField: TemplateField, isNew: boolean) {
    if (templateField.childTemplateFields == null)
      templateField.childTemplateFields = [];

    if (templateField.groupTemplateFields == null)
      templateField.groupTemplateFields = [];

    var gg: GroupTemplateField = { id: templateField.groupTemplateFields.length.toString(), fields: templateField.childTemplateFields };

    templateField.childTemplateFields.forEach(ctField => {
      var fieldGroup = this.fb.group({
        fieldId: [ctField.id],
        parentFieldId: [templateField.id],
        surveyResponseId: [0],
        code: [ctField.code],
        response: [ctField.response],
      });

      this.fieldGroups[ctField.id] = fieldGroup;
      this.templateFields.push(ctField);
    });


    templateField.groupTemplateFields.push(gg);

    console.log(templateField, this.fieldGroups);

    //this.changeRef.detectChanges();
  }

  deleteCustomFieldProperty(templateField: TemplateField, gFields: GroupTemplateField) {
    if (templateField.groupTemplateFields == null)
      templateField.groupTemplateFields = [];

    templateField.groupTemplateFields = templateField.groupTemplateFields.filter(item => item.id != gFields.id);

    this.changeRef.detectChanges();
  }

}

interface Dictionary {
  [key: string]: any[];
}

interface FGDictionary {
  [key: string]: FormGroup;
}

interface ResponseDictionary {
  [key: string]: TemplateField[];
}