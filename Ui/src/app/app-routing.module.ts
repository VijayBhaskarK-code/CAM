import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TemplateListComponent } from './template-list/template-list.component';
import { TemplateDetailsComponent } from './template-details/template-details.component';
import { TemplateSurveyComponent } from './template-survey/template-survey.component';

const routes: Routes = [
  {path:'', redirectTo:'templates', pathMatch:'full'},
  {path:'templates', component: TemplateListComponent },
  {path:'templates/:versionId', component: TemplateDetailsComponent },
  {path:'survey/:surveyId', component: TemplateSurveyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
