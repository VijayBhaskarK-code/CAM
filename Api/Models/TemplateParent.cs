namespace Api.Models;

public partial class TemplateParent
{
    public int Id { get; set; }

    public string Title { get; set; } = null!;

    public string? Code { get; set; }

    public string? AliasName { get; set; }

    public int TemplateTypeId { get; set; }

    public string? CreatedBy { get; set; }

    public string? UpdatedBy { get; set; }

    public DateTime? CreatedUtcDate { get; set; }

    public DateTime? UpdatedUtcDate { get; set; }

    public virtual TemplateType TemplateType { get; set; } = null!;

    public virtual ICollection<TemplateVersion> TemplateVersions { get; set; } = new List<TemplateVersion>();
}
