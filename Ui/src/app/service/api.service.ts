import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TemplateParent } from '../models/template.parent.model';
import { TemplateVersion } from '../models/template.version.model';
import { TemplatePanel } from '../models/template.panel.model';
import { TemplateSection } from '../models/template.section.model';
import { TemplateField } from '../models/template.field.model';
import { TemplateSurvey } from '../models/template.survey.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl: string = "http://localhost:5024/api"
  constructor(private http: HttpClient) { }

  getTemplateParents() {
    return this.http.get<TemplateParent[]>(`${this.baseUrl}/templateparent`)
  }

  getTemplateParentById(id: number) {
    return this.http.get<TemplateParent>(`${this.baseUrl}/templateparent?${id}`)
  }

  getTemplateVersions() {
    return this.http.get<TemplateVersion[]>(`${this.baseUrl}/templateversion`)
  }

  getTemplateVersionsByParent(id: number) {
    return this.http.get<TemplateVersion[]>(`${this.baseUrl}/templateversion/byTemplateId/${id}`)
  }

  getTemplateVersionById(id: number) {
    return this.http.get<TemplateVersion>(`${this.baseUrl}/templateversion/${id}`)
  }

  getSurveyById(id: number) {
    return this.http.get<TemplateSurvey>(`${this.baseUrl}/templatesurvey/${id}`)
  }

  GetInputTypes() {
    return this.http.get<string[]>(`${this.baseUrl}/templatefield/inputTypes`)
  }

  updateTemplatePanel(templatePanel: TemplatePanel) {
    if (templatePanel.id == undefined)
      return this.http.post<TemplatePanel>(`${this.baseUrl}/templatepanel`, templatePanel)

    return this.http.put<TemplatePanel>(`${this.baseUrl}/templatepanel`, templatePanel)
  }

  updateTemplateSection(templateSection: TemplateSection) {
    if (templateSection.id == undefined)
      return this.http.post<TemplateSection>(`${this.baseUrl}/templatesection`, templateSection)

    return this.http.put<TemplateSection>(`${this.baseUrl}/templatesection`, templateSection)
  }

  updateTemplateField(templateField: TemplateField) {
    if (templateField.id == undefined)
      return this.http.post<TemplateField>(`${this.baseUrl}/templatefield`, templateField)

    return this.http.put<TemplateField>(`${this.baseUrl}/templatefield`, templateField)
  }

  updateTemplateSurvey(templateSurvey: TemplateSurvey) {
    return this.http.put<TemplateSurvey>(`${this.baseUrl}/templateSurvey`, templateSurvey)
  }

  deleteTemplatePanel(templatePanel: TemplatePanel) {
    return this.http.delete(`${this.baseUrl}/templatepanel/${templatePanel.id}`)
  }

  deleteTemplateSection(templateSection: TemplateSection) {
    return this.http.delete(`${this.baseUrl}/templatesection/${templateSection.id}`)
  }

  deleteTemplateField(templateField: TemplateField) {
    return this.http.delete(`${this.baseUrl}/templatefield/${templateField.id}`)
  }
}

