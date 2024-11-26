namespace Api.Models;

public partial class TemplateVersion
{
    public int Id { get; set; }

    public int TemplateId { get; set; }

    public string Version { get; set; } = null!;

    public int? Status { get; set; }

    public string? Caption { get; set; }

    public string? Description { get; set; }

    public DateTime? PublishedUtcDate { get; set; }

    public string? CreatedBy { get; set; }

    public string? ModifiedBy { get; set; }

    public DateTime? CreatedUTCDate { get; set; }

    public DateTime? ModifiedUTCDate { get; set; }

    public virtual TemplateParent Template { get; set; } = null!;

    public virtual ICollection<TemplatePanel> TemplatePanels { get; set; } = new List<TemplatePanel>();
}
