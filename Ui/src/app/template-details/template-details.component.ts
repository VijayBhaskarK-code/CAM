import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, inject, NgModule } from '@angular/core';
import { NgIf } from '@angular/common';
import { TemplatePanel } from '../models/template.panel.model';
import { TemplateSection } from '../models/template.section.model';
import { TemplateVersion } from '../models/template.version.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ApiService } from '../service/api.service';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule } from '@angular/material/tree';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TemplateField, GroupTemplateField } from '../models/template.field.model';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CreateTemplatePanelComponent } from '../create-template-panel/create-template-panel.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-template-details',
  standalone: true,
  imports: [
    CommonModule,
    CreateTemplatePanelComponent, MatRadioModule,
    FormsModule, ReactiveFormsModule, MatCheckboxModule, NgIf, MatTooltipModule,
    MatFormFieldModule, MatCardModule, MatExpansionModule, MatSlideToggleModule,
    MatPaginator, MatTableModule, MatInputModule, MatButtonModule, MatTreeModule,
    MatSidenavModule, MatSelectModule, MatListModule, MatIconModule, MatToolbarModule,
    MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule,
    MatDatepickerModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './template-details.component.html',
  styles: `
.example-container {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 60px;
  bottom: 5px;
  left: 5px;
  right: 5px;
}

.mat-expansion-indicator {
    left: 0px;
  }

.mat-sidenav {
  width: 700px;
}

.mat-right-sidenav {
  width: 100%;
}

.example-right-container {
  display: flex;
            justify-content: flex-end;
          }

.example-full-width {
  width: 100%;
}

.mat-mdc-list-item-icon {
  color: rgba(0, 0, 0, 0.54);
}

.divider {
  color: red;
}


.example-container {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 60px;
  bottom: 5px;
  left: 5px;
  right: 5px;
}

.horizontal-container {
  display: flex;
   flex-direction: row;
   flex-wrap: wrap;
  top: 60px;
  bottom: 5px;
  left: 50px;
  right: 50px;
}

.horizontal-control-container {
  display: block;
  top: 60px;
  bottom: 50px;
  left: 50px;
  right: 50px;
  
  margin-left: 10px;
  margin-right: 10px;
}

.vertical-container {
  display: flex;
  top: 60px;
  bottom: 5px;
  left: 5px;
  right: 5px;
}

`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateDetailsComponent implements OnInit {
  suggestions: Dictionary = {};
  showFiller = false;
  templateVersionId!: number;
  templateVersion!: TemplateVersion;
  templatePanels!: TemplatePanel[];
  dataSource!: TemplatePanel[];

  isTemplatePanel!: boolean;
  isTemplateSection!: boolean;
  isTemplateField!: boolean;

  selectTemplatePanel!: TemplatePanel;
  templatePanelForm!: FormGroup;

  selectTemplateSection!: TemplateSection;
  templateSectionForm!: FormGroup;

  selectTemplateField!: TemplateField;
  templateFieldForm!: FormGroup;

  isPreviewing: boolean = false;
  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router, private activatedRoute: ActivatedRoute,
    private changeRef: ChangeDetectorRef) {
    this.isTemplatePanel = this.isTemplateSection = this.isTemplateField = false;
  }

  ngOnInit() {
    this.templatePanelForm = this.fb.group({
      id: [''],
      name: [''],
      hintName: [''],
      templateVersionId: [''],
      order: [0],
      row: [0],
    });

    this.templateSectionForm = this.fb.group({
      id: [''],
      templatePanelId: [''],
      sectionName: [''],
      arrayName: [''],
      order: [0],
      row: [0],
      config: [''],
      showButton: [''],
      sectionHeader: [''],
      hintName: [''],
      showHeader: [''],
      hideHint: [''],
      buttonLabel: [''],
      ctHeader: [''],
      onCondition: [''],
    });

    this.templateFieldForm = this.fb.group({
      id: [''],
      caption: [''],
      code: [''],
      inputType: [''],
      order: [0],
      row: [0],
      label: [''],
      validators: [''],
      options: [''],
      placeholder: [''],
      errorMessages: [''],
      suggestions: [''],
      maxLength: [0],
    });

    this.activatedRoute.params.subscribe(val => {
      this.templateVersionId = val['versionId'];
      if (this.templateVersionId) {
        this.getSuggestions();
        this.getTemplateVersion(this.templateVersionId);
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

  getTemplateVersion(id: number) {
    this.apiService.getTemplateVersionById(id)
      .subscribe({
        next: (res) => {
          this.templateVersion = res;

          this.templateVersion.templatePanels.forEach(tPanel => {
            tPanel.templateSections.forEach(tSection => {
              var removeItems: number[] = [];

              tSection.templateFields.forEach((tField) => {

                if (tField.suggestions != undefined) {
                  tField.suggestionOptions = JSON.parse(tField.suggestions);
                  
                  if (tField.suggestionOptions != null && tField.suggestionOptions.source != null) {
                    tField.suggestionOptions.items = this.suggestions[tField.suggestionOptions.source];
                  }                  
                }

                if (tField.options != undefined) {
                  tField.optionItems = JSON.parse(tField.options);
                }
              });

              tSection.templateFields.forEach((tField) => {

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
              })

              removeItems.forEach((id) => {
                tSection.templateFields = tSection.templateFields.filter(item => item.id != id);
              });
            })
          });

          this.templatePanels = this.templateVersion.templatePanels;
          this.changeRef.detectChanges();
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

  editPanelProperty(templatePanel: TemplatePanel) {
    if (this.isPreviewing) this.togglePreviewSidenav();
    this.selectTemplatePanel = templatePanel;
    this.templatePanelForm.setValue({
      id: this.selectTemplatePanel.id,
      name: this.selectTemplatePanel.name,
      hintName: this.selectTemplatePanel.hintName,
      templateVersionId: this.selectTemplatePanel.templateVersionId,
      order: this.selectTemplatePanel.order ?? 0,
      row: this.selectTemplatePanel.row ?? 0,
    })

    this.isTemplatePanel = true;
    this.isTemplateSection = this.isTemplateField = false;
  }

  savePanelProperty() {
    this.selectTemplatePanel.name = this.templatePanelForm.value.name;
    this.selectTemplatePanel.hintName = this.templatePanelForm.value.hintName;
    this.selectTemplatePanel.order = this.templatePanelForm.value.order;
    this.selectTemplatePanel.row = this.templatePanelForm.value.row;

    this.apiService.updateTemplatePanel(this.selectTemplatePanel)
      .subscribe(res => {
        //this.toastService.success({ detail: 'SUCCESS', summary: 'Registration Successful', duration: 3000 });
        this.templatePanelForm.reset();
        this.selectTemplatePanel = res;

        this.isTemplatePanel = this.isTemplateSection = this.isTemplateField = false;

        this.getTemplateVersion(this.templateVersionId);
      });
  }

  cancelProperty() {
    this.templatePanelForm.reset();
    this.templateSectionForm.reset();
    this.templateFieldForm.reset();

    this.selectTemplatePanel = {} as TemplatePanel;
    this.selectTemplateSection = {} as TemplateSection;
    this.selectTemplateField = {} as TemplateField;

    this.isTemplatePanel = this.isTemplateSection = this.isTemplateField = false;

    this.getTemplateVersion(this.templateVersionId);
  }

  addPanelProperty() {
    this.selectTemplatePanel = {} as TemplatePanel;
    this.selectTemplatePanel.templateVersionId = this.templateVersionId;
    this.templatePanelForm.reset();

    this.isTemplatePanel = true;
    this.isTemplateSection = this.isTemplateField = false;
  }

  deletePanelProperty(templatePanel: TemplatePanel) {
    this.apiService.deleteTemplatePanel(templatePanel)
      .subscribe(res => {
        //this.toastService.success({ detail: 'SUCCESS', summary: 'Registration Successful', duration: 3000 });
        this.templatePanelForm.reset();
        this.selectTemplatePanel = {} as TemplatePanel;;

        this.isTemplatePanel = this.isTemplateSection = this.isTemplateField = false;
        this.getTemplateVersion(this.templateVersionId);
      });
  }

  editSectionProperty(templateSection: TemplateSection) {
    if (this.isPreviewing) this.togglePreviewSidenav();
    this.selectTemplateSection = templateSection;
    this.templateSectionForm.setValue({
      id: this.selectTemplateSection.id,
      templatePanelId: this.selectTemplateSection.templatePanelId,
      sectionName: this.selectTemplateSection.sectionName,
      arrayName: this.selectTemplateSection.arrayName,
      config: this.selectTemplateSection.config,
      showButton: this.selectTemplateSection.showButton,
      sectionHeader: this.selectTemplateSection.sectionHeader,
      hintName: this.selectTemplateSection.hintName,
      showHeader: this.selectTemplateSection.showHeader,
      hideHint: this.selectTemplateSection.hideHint,
      buttonLabel: this.selectTemplateSection.buttonLabel,
      onCondition: this.selectTemplateSection.onCondition,
      order: this.selectTemplateSection.order ?? 0,
      row: this.selectTemplateSection.row ?? 0,
      ctHeader: this.selectTemplateSection.ctHeader ?? '',
    })

    this.isTemplateSection = true;
    this.isTemplatePanel = this.isTemplateField = false;
  }

  saveSectionProperty() {
    this.selectTemplateSection.sectionName = this.templateSectionForm.value.sectionName;
    this.selectTemplateSection.arrayName = this.templateSectionForm.value.arrayName;
    this.selectTemplateSection.config = this.templateSectionForm.value.config;
    this.selectTemplateSection.showButton = this.templateSectionForm.value.showButton;
    this.selectTemplateSection.sectionHeader = this.templateSectionForm.value.sectionHeader;
    this.selectTemplateSection.hintName = this.templateSectionForm.value.hintName;
    this.selectTemplateSection.showHeader = this.templateSectionForm.value.showHeader;
    this.selectTemplateSection.hideHint = this.templateSectionForm.value.hideHint;
    this.selectTemplateSection.buttonLabel = this.templateSectionForm.value.buttonLabel;
    this.selectTemplateSection.ctHeader = this.templateSectionForm.value.ctHeader,
      this.selectTemplateSection.onCondition = this.templateSectionForm.value.onCondition;
    this.selectTemplateSection.order = this.templateSectionForm.value.order;
    this.selectTemplateSection.row = this.templateSectionForm.value.row;

    this.apiService.updateTemplateSection(this.selectTemplateSection)
      .subscribe(res => {
        //this.toastService.success({ detail: 'SUCCESS', summary: 'Registration Successful', duration: 3000 });
        this.templateSectionForm.reset();
        this.selectTemplateSection = res;

        this.isTemplatePanel = this.isTemplateSection = this.isTemplateField = false;

        this.getTemplateVersion(this.templateVersionId);
      });
  }

  deleteSectionProperty(templateSection: TemplateSection) {
    this.apiService.deleteTemplateSection(templateSection)
      .subscribe(res => {
        //this.toastService.success({ detail: 'SUCCESS', summary: 'Registration Successful', duration: 3000 });
        this.templateSectionForm.reset();
        this.selectTemplateSection = {} as TemplateSection;;

        this.isTemplatePanel = this.isTemplateSection = this.isTemplateField = false;
        this.getTemplateVersion(this.templateVersionId);
      });
  }

  addSectionProperty(templatePanel: TemplatePanel) {
    this.selectTemplateSection = {} as TemplateSection;
    this.templateSectionForm.reset();
    this.selectTemplateSection.templatePanelId = templatePanel.id;

    this.isTemplateSection = true;
    this.isTemplatePanel = this.isTemplateField = false;
  }

  editFieldProperty(templateField: TemplateField) {
    if (this.isPreviewing) this.togglePreviewSidenav();

    this.selectTemplateField = templateField;
    this.templateFieldForm.setValue({
      id: this.selectTemplateField.id,
      caption: this.selectTemplateField.caption,
      code: this.selectTemplateField.code,
      inputType: this.selectTemplateField.inputType,
      order: this.selectTemplateField.order ?? 0,
      row: this.selectTemplateField.rowNumber ?? 0,
      label: this.selectTemplateField.label,
      validators: this.selectTemplateField.validators,
      options: this.selectTemplateField.options,
      placeholder: this.selectTemplateField.placeholder,
      errorMessages: this.selectTemplateField.errorMessages,
      suggestions: this.selectTemplateField.suggestions,
      maxLength: this.selectTemplateField.maxLength ?? 0,
    })

    this.isTemplateField = true;
    this.isTemplateSection = this.isTemplatePanel = false;
  }

  saveFieldProperty() {
    this.selectTemplateField.code = this.templateFieldForm.value.code;
    this.selectTemplateField.caption = this.templateFieldForm.value.caption;
    this.selectTemplateField.order = this.templateFieldForm.value.order;
    this.selectTemplateField.rowNumber = this.templateFieldForm.value.row;
    this.selectTemplateField.inputType = this.templateFieldForm.value.inputType;
    this.selectTemplateField.label = this.templateFieldForm.value.label;
    this.selectTemplateField.validators = this.templateFieldForm.value.validators;
    this.selectTemplateField.options = this.templateFieldForm.value.options;
    this.selectTemplateField.placeholder = this.templateFieldForm.value.placeholder;
    this.selectTemplateField.errorMessages = this.templateFieldForm.value.errorMessages;
    this.selectTemplateField.suggestions = this.templateFieldForm.value.suggestions;
    this.selectTemplateField.maxLength = this.templateFieldForm.value.ma;

    this.apiService.updateTemplateField(this.selectTemplateField)
      .subscribe(res => {
        //this.toastService.success({ detail: 'SUCCESS', summary: 'Registration Successful', duration: 3000 });
        this.templateFieldForm.reset();
        this.selectTemplateField = res;

        this.isTemplatePanel = this.isTemplateSection = this.isTemplateField = false;
        this.getTemplateVersion(this.templateVersionId);
      });
  }

  deleteFieldProperty(templateField: TemplateField) {
    this.apiService.deleteTemplateField(templateField)
      .subscribe(res => {
        //this.toastService.success({ detail: 'SUCCESS', summary: 'Registration Successful', duration: 3000 });
        this.templateFieldForm.reset();
        this.selectTemplateField = {} as TemplateField;;

        this.isTemplatePanel = this.isTemplateSection = this.isTemplateField = false;
        this.getTemplateVersion(this.templateVersionId);
      });
  }

  deleteCustomFieldProperty(templateField: TemplateField, gFields: GroupTemplateField) {
    if (templateField.groupTemplateFields == null)
      templateField.groupTemplateFields = [];

    templateField.groupTemplateFields = templateField.groupTemplateFields.filter(item => item.id != gFields.id);

    this.changeRef.detectChanges();
  }

  addCustomFieldProperty(templateField: TemplateField) {
    if (templateField.childTemplateFields == null)
      templateField.childTemplateFields = [];

    if (templateField.groupTemplateFields == null)
      templateField.groupTemplateFields = [];

    var gg: GroupTemplateField = { id: templateField.groupTemplateFields.length.toString(), fields: templateField.childTemplateFields };

    templateField.groupTemplateFields.push(gg);

    this.changeRef.detectChanges();
  }

  addFieldProperty(templateSection: TemplateSection) {
    this.selectTemplateField = {} as TemplateField;
    this.templateFieldForm.reset();
    this.selectTemplateField.templateSectionId = templateSection.id;

    this.isTemplateField = true;
    this.isTemplateSection = this.isTemplatePanel = false;
  }

  addChildFieldProperty(templateField: TemplateField) {
    this.selectTemplateField = {} as TemplateField;
    this.templateFieldForm.reset();
    this.selectTemplateField.templateSectionId = templateField.templateSectionId;
    this.selectTemplateField.parentFieldId = templateField.id;

    this.isTemplateField = true;
    this.isTemplateSection = this.isTemplatePanel = false;
  }

  togglePreviewSidenav() {
    //this.router.navigate(['controls/'+ this.templateVersionId +'/preview'])

    this.isPreviewing = !this.isPreviewing;
  }
}


interface Dictionary {
  [key: string]: any[];
}