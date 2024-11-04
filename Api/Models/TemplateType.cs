namespace Api.Models;

public partial class TemplateType
{
    public int Id { get; set; }

    public string Code { get; set; } = null!;

    public string Description { get; set; } = null!;

    public string? CreatedBy { get; set; }

    public string? UpdatedBy { get; set; }

    public DateTime? CreatedUtcDate { get; set; }

    public DateTime? UpdatedUtcDate { get; set; }

    public virtual ICollection<TemplateParent> TemplateParents { get; set; } = new List<TemplateParent>();
}
