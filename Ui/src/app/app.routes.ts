import { Routes } from '@angular/router';
import { CreateTemplateComponent } from './create-template/create-template.component';
import { TemplateListComponent } from './template-list/template-list.component';
import { TemplateVersionListComponent } from './template-version-list/template-version-list.component';
import { TemplateDetailsComponent } from './template-details/template-details.component';

export const routes: Routes = [
    {path:'', redirectTo:'templates', pathMatch:'full'},
    {path:'templates', component: TemplateListComponent },
    {path:'versions/:parentTemplateId', component: TemplateVersionListComponent },
    {path:'controls/:versionId', component: TemplateDetailsComponent },
];
