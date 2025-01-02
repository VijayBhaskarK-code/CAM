import { TemplateSection } from "./template.section.model";
import { TemplateSurveyResponse } from "./template.survey.response.model";
import { TemplateSurveyChildResponse } from "./template.survey.child.response.model";

export interface TemplateField {
    id: number;
    templateSectionId: number;
    parentFieldId: number | null;
    caption: string | null;
    code: string;
    inputType: string | null;
    label: string | null;
    validators: string | null;
    options: string | null;
    optionItems: TemplateFieldOption[] | null;
    errorMessages: string | null;
    asyncValidators: string | null;
    required: boolean | null;
    requiredOnSave: boolean | null;
    order: number | null;
    rowNumber: number | null;
    panelType: string | null;
    placeholder: string | null;
    outputType: string | null;
    maxLength: number | null;
    inline: string | null;    
    list: string | null;
    suggestions: string | null;
    suggestionOptions: SuggestionOptions;
    additional: string | null;
    multiple: boolean | null;
    initialCount: number | null;
    group: string | null;
    hidden: boolean | null;
    groupPrototype: string | null;
    createdBy: string | null;
    updatedBy: string | null;
    createdUtcDate: string | null;
    updatedUtcDate: string | null;
    parentTemplateSection: TemplateSection;
    childTemplateFields: TemplateField[] | null;
    groupTemplateFields: GroupTemplateField[] | null;
    type: string | 'Field';
    response: string | null;
    templateSurveyResponses: TemplateSurveyResponse[] | null;
    templateSurveyChildResponses: TemplateSurveyChildResponse[] | null;
}

export interface TemplateFieldOption {
    label: string | null;
    value: string | null;
}

export interface GroupTemplateField {
    id: string | null;
    fields: TemplateField[] | null;
}

export interface SuggestionOptions {
    source: string | null;
    items: any[];
}