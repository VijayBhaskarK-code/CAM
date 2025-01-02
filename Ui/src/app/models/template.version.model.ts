import { TemplateParent } from "./template.parent.model";
import { TemplatePanel } from "./template.panel.model";
import { TemplateSurvey } from "./template.survey.model";

export interface TemplateVersion {
    id: number;
    templateId: number;
    version: string;
    status: number | null;
    caption: string | null;
    description: string | null;
    publishedUtcDate: string | null;
    createdBy: string | null;
    updatedBy: string | null;
    createdUtcDate: string | null;
    updatedUtcDate: string | null;
    parentTemplate: TemplateParent;
    templatePanels: TemplatePanel[];
    templateSurveys: TemplateSurvey[] | null;
}