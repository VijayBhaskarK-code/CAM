﻿namespace Api.Models;

public partial class TemplateSection
{
    public int Id { get; set; }

    public int TemplatePanelId { get; set; }

    public string SectionName { get; set; } = null!;

    public string? ArrayName { get; set; }

    public bool? Config { get; set; }

    public bool? ShowButton { get; set; }

    public string? SectionHeader { get; set; }

    public string? HintName { get; set; }

    public int? Order { get; set; }

    public int? Row { get; set; }

    public bool? ShowHeader { get; set; }

    public bool? HideHint { get; set; }

    public string? ButtonLabel { get; set; }

    public string? Ctheader { get; set; }

    public string? OnCondition { get; set; }

    public string? CreatedBy { get; set; }

    public string? ModifiedBy { get; set; }

    public DateTime? CreatedUTCDate { get; set; }

    public DateTime? ModifiedUTCDate { get; set; }

    public virtual ICollection<TemplateField>? TemplateFields { get; set; } = new List<TemplateField>();

    public virtual TemplatePanel? TemplatePanel { get; set; } = null!;
}
