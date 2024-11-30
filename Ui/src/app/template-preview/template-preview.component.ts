import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Router, ActivatedRoute } from '@angular/router';

import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

import { TemplatePanel } from '../models/template.panel.model';
import { TemplateSection } from '../models/template.section.model';
import { TemplateVersion } from '../models/template.version.model';
import { TemplateField, GroupTemplateField } from '../models/template.field.model';

import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-template-preview',
  standalone: true,
  imports: [
    CommonModule,

    MatListModule,
    MatCardModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatIconModule
  ],
  providers: [
    MatDatepickerModule
  ],
  templateUrl: './template-preview.component.html',
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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplatePreviewComponent implements OnInit {
  templateVersionId!: number;
  templateVersion!: TemplateVersion;
  templatePanels!: TemplatePanel[];
  dataSource!: TemplatePanel[];

  constructor(private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private changeRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(val => {
      //this.templateVersionId = val['versionId'];
      this.templateVersionId = 1;
      if (this.templateVersionId) {
        this.getTemplateVersion(this.templateVersionId);
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


                if (tField.options != undefined) {
                  tField.optionItems = JSON.parse(tField.options);
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
              })

              removeItems.forEach((id) => {
                tSection.templateFields = tSection.templateFields.filter(item => item.id != id);
              });
            })
          });

          this.templatePanels = this.templateVersion.templatePanels;
          console.log(this.templatePanels);
          this.changeRef.detectChanges();
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

  addFieldProperty(templateField: TemplateField) {
    if (templateField.childTemplateFields == null)
      templateField.childTemplateFields = [];

    if (templateField.groupTemplateFields == null)
      templateField.groupTemplateFields = [];

    var gg: GroupTemplateField = { id: templateField.groupTemplateFields.length.toString(), fields: templateField.childTemplateFields };

    templateField.groupTemplateFields.push(gg);

    this.changeRef.detectChanges();
  }

  deleteFieldProperty(templateField: TemplateField, gFields: GroupTemplateField) {
    if (templateField.groupTemplateFields == null)
      templateField.groupTemplateFields = [];

    templateField.groupTemplateFields = templateField.groupTemplateFields.filter(item => item.id != gFields.id);

    this.changeRef.detectChanges();
  }
}
