namespace Api.Models;

public partial class TemplateField
{
    public int Id { get; set; }

    public int TemplateSectionId { get; set; }

    public int? ParentFieldId { get; set; }

    public string? Caption { get; set; }

    public string Code { get; set; } = null!;

    public string? InputType { get; set; }

    public string? Label { get; set; }

    public string? Validators { get; set; }

    public string? Options { get; set; }

    public string? ErrorMessages { get; set; }

    public string? AsyncValidators { get; set; }

    public bool? Required { get; set; }

    public bool? RequiredOnSave { get; set; }

    public int? Order { get; set; }

    public int? RowNumber { get; set; }

    public string? PanelType { get; set; }

    public string? Placeholder { get; set; }

    public string? OutputType { get; set; }

    public int? MaxLength { get; set; }

    public string? Inline { get; set; }

    public string? List { get; set; }

    public string? Suggestions { get; set; }

    public string? Additional { get; set; }

    public bool? Multiple { get; set; }

    public int? InitialCount { get; set; }

    public string? Group { get; set; }

    public bool? Hidden { get; set; }

    public string? GroupPrototype { get; set; }

    public string? CreatedBy { get; set; }

    public string? UpdatedBy { get; set; }

    public DateTime? CreatedUtcDate { get; set; }

    public DateTime? UpdatedUtcDate { get; set; }

    public virtual TemplateSection? TemplateSection { get; set; } = null!;
 
}
