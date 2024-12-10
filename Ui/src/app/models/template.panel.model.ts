import { TemplateSection } from "./template.section.model";
import { TemplateVersion } from "./template.version.model";

export interface TemplatePanel {
    id: number;
    name: string;
    hintName: string | null;
    templateVersionId: number;
    order: number | null;
    row: number | null;
    createdBy: string | null;
    updatedBy: string | null;
    createdUtcDate: string | null;
    updatedUtcDate: string | null;
    templateSections: TemplateSection[];
    parentTemplateVersion: TemplateVersion;
    type: string | 'Panel';
}