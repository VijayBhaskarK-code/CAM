import { TemplateSurvey } from "./template.survey.model";
import { TemplateSurveyChildResponse } from "./template.survey.child.response.model";
import { TemplateField } from "./template.field.model";

export interface TemplateSurveyResponse {
    id: number;
    templateSurveyId: number;
    templateFieldId: number;
    response: string | null;
    createdBy: string | null;
    updatedBy: string | null;
    createdUtcDate: string | null;
    updatedUtcDate: string | null;
    templateSurvey: TemplateSurvey | null;
    templateSurveyChildResponses: TemplateSurveyChildResponse[] | null;
    templateField: TemplateField | null;
}