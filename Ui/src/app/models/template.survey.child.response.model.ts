import { TemplateSurveyResponse } from "./template.survey.response.model";
import { TemplateField } from "./template.field.model";

export interface TemplateSurveyChildResponse {
    id: number;
    templateSurveyResponseId: number;
    templateFieldId: number;
    response: string | null;
    createdBy: string | null;
    updatedBy: string | null;
    createdUtcDate: string | null;
    updatedUtcDate: string | null;
    templateSurveyResponse: TemplateSurveyResponse | null;
    templateField: TemplateField | null;
}