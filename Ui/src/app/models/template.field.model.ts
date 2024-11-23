import { TemplateSection } from "./template.section.model";

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
}

export interface TemplateFieldOption {
    label: string | null;
    value: string | null;
}