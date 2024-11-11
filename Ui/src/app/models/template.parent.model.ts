import { TemplateType } from "./template.type.model";
import { TemplateVersion } from "./template.version.model";

export interface TemplateParent {
    id: number;
    title: string;
    code: string | null;
    aliasName: string | null;
    templateTypeId: number;
    createdBy: string | null;
    updatedBy: string | null;
    createdUtcDate: string | null;
    updatedUtcDate: string | null;
    templateType: TemplateType | null;
    templateVersions: TemplateVersion[] | null;
}