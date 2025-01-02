import { TemplateVersion } from "./template.version.model";
import { TemplateSurveyResponse } from "./template.survey.response.model";

export interface TemplateSurvey {
    id: number;
    templateVersionId: number;
    userId: number;
    status: number | null;
    createdBy: string | null;
    updatedBy: string | null;
    createdUtcDate: string | null;
    updatedUtcDate: string | null;
    templateVersion: TemplateVersion | null;
    templateSurveyResponses: TemplateSurveyResponse[];
}