import { TemplateSurveyResponse } from "./template.survey.response.model";
import { TemplateField } from "./template.field.model";


export interface SurveyChildResponse {
    id: string;
    templateFieldId: number;
    response: string | null;
    createdBy: string | null;
    updatedBy: string | null;
    createdUtcDate: string | null;
    updatedUtcDate: string | null;
}

export interface GroupSurveyChildResponse {
    id: string;
    templateSurveyResponseId: number;
    surveyChildResponses: SurveyChildResponse[];
    createdBy: string | null;
    updatedBy: string | null;
    createdUtcDate: string | null;
    updatedUtcDate: string | null;
}