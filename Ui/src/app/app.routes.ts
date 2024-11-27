import { Routes } from '@angular/router';
import { TemplateParentListComponent } from './template-parent-list/template-parent-list.component';
import { CreateTemplatePanelComponent } from './create-template-panel/create-template-panel.component';
import { CreateTemplateVersionComponent } from './create-template-version/create-template-version.component';
import { TemplateListComponent } from './template-list/template-list.component';
import { TemplateVersionListComponent } from './template-version-list/template-version-list.component';
import { TemplateDetailsComponent } from './template-details/template-details.component';

export const routes: Routes = [
    {path:'', redirectTo:'templates', pathMatch:'full'},
    {path:'templates', component: TemplateListComponent },
    {path:'versions/:parentTemplateId', component: TemplateVersionListComponent },
    {path:'controls/:versionId', component: TemplateDetailsComponent },
    {path:'controls/:versionId/preview', component: CreateTemplatePanelComponent },
    {path:'controls/preview/:versionId', component: CreateTemplateVersionComponent },
];
