import { TemplateField } from "./template.field.model";
import { TemplatePanel } from "./template.panel.model";

export interface TemplateSection {
    id: number;
    templatePanelId: number;
    sectionName: string;
    arrayName: string | null;
    config: boolean | null;
    showButton: boolean | null;
    sectionHeader: string | null;
    hintName: string | null;
    showHeader: boolean | null;
    hideHint: boolean | null;
    buttonLabel: string | null;
    ctHeader: string | null;
    onCondition: string | null;
    row: number | null;
    order: number | null;
    createdBy: string | null;
    updatedBy: string | null;
    createdUtcDate: string | null;
    updatedUtcDate: string | null;
    templateFields: TemplateField[];
    parentTemplatePanel: TemplatePanel;
    type: string | 'Section';
}