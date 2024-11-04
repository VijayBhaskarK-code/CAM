using System;
using System.Collections.Generic;

namespace Api.Models;

public partial class TemplatePanel
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? HintName { get; set; }

    public int TemplateVersionId { get; set; }

    public int? Order { get; set; }

    public int? Row { get; set; }

    public string? CreatedBy { get; set; }

    public string? UpdatedBy { get; set; }

    public DateTime? CreatedUtcDate { get; set; }

    public DateTime? UpdatedUtcDate { get; set; }

    public virtual ICollection<TemplateSection> TemplateSections { get; set; } = new List<TemplateSection>();

    public virtual TemplateVersion TemplateVersion { get; set; } = null!;
}
