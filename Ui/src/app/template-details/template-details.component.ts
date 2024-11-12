import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, ChangeDetectionStrategy, OnDestroy, inject } from '@angular/core';
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
import { TemplateField } from '../models/template.field.model';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-template-details',
  standalone: true,
  imports: [
    FormsModule, ReactiveFormsModule, MatCheckboxModule, NgIf, MatTooltipModule,
    MatFormFieldModule, MatCardModule, MatExpansionModule, MatSlideToggleModule, MatPaginator, MatTableModule, MatInputModule, MatButtonModule, MatTreeModule, MatSidenavModule, MatSelectModule, MatListModule, MatIconModule, MatToolbarModule
  ],
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

.mat-sidenav {
  width: 500px;
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

`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateDetailsComponent implements OnInit {
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

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router, private activatedRoute: ActivatedRoute) {
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
      config: [''],
      showButton: [''],
      sectionHeader: [''],
      hintName: [''],
      showHeader: [''],
      hideHint: [''],
      buttonLabel: [''],
      //ctHeader: [''],
      onCondition: [''],
      //sectionOrder: [''],
      //sectionRow: [0],       
    });

    this.templateFieldForm = this.fb.group({
      id: [''],
      caption: [''],
      code: [''],
    });

    this.activatedRoute.params.subscribe(val => {
      this.templateVersionId = val['versionId'];
      if (this.templateVersionId) {
        this.getTemplateVersion(this.templateVersionId);
      }
    })
  }

  getTemplateVersion(id: number) {
    this.apiService.getTemplateVersionById(id)
      .subscribe({
        next: (res) => {
          if (res.length == 0)
            return;

          this.templateVersion = res[0];
          this.templatePanels = this.templateVersion.templatePanels;
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

  editPanelProperty(templatePanel: TemplatePanel) {
    this.selectTemplatePanel = templatePanel;
    this.templatePanelForm.setValue({
      id: this.selectTemplatePanel.id,
      name: this.selectTemplatePanel.name,
      hintName: this.selectTemplatePanel.hintName,
      templateVersionId: this.selectTemplatePanel.templateVersionId,
      order: this.selectTemplatePanel.order,
      row: this.selectTemplatePanel.row,
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
      //ctHeader: this.selectTemplateSection.ctHeader,
      onCondition: this.selectTemplateSection.onCondition,
      //sectionOrder: this.selectTemplateSection.order,
      //sectionRow: this.selectTemplateSection.row,
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
    //ctHeader: this.selectTemplateSection.ctHeader,
    this.selectTemplateSection.onCondition = this.templateSectionForm.value.onCondition;
    //this.selectTemplateSection.order = this.templateSectionForm.value.sectionOrder;
    //this.selectTemplateSection.row = this.templateSectionForm.value.sectionRow;

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

    this.selectTemplateField = templateField;
    this.templateFieldForm.setValue({
      id: this.selectTemplateField.id,
      caption: this.selectTemplateField.caption,
      code: this.selectTemplateField.code,
    })

    this.isTemplateField = true;
    this.isTemplateSection = this.isTemplatePanel = false;
  }

  saveFieldProperty() {
    this.selectTemplateField.code = this.templateFieldForm.value.code;
    this.selectTemplateField.caption = this.templateFieldForm.value.caption;

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

  addFieldProperty(templateSection: TemplateSection) {
    this.selectTemplateField = {} as TemplateField;
    this.templateFieldForm.reset();
    this.selectTemplateField.templateSectionId = templateSection.id;

    this.isTemplateField = true;
    this.isTemplateSection = this.isTemplatePanel = false;
  }
}
