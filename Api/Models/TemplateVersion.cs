using System;
using System.Collections.Generic;

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

    public string? UpdatedBy { get; set; }

    public DateTime? CreatedUtcDate { get; set; }

    public DateTime? UpdatedUtcDate { get; set; }

    public virtual TemplateParent Template { get; set; } = null!;

    public virtual ICollection<TemplatePanel> TemplatePanels { get; set; } = new List<TemplatePanel>();
}
