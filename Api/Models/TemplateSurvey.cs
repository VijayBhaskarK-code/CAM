namespace Api.Models;

public partial class TemplateSurvey
{
    public int Id { get; set; }

    public int TemplateVersionId { get; set; }

    public int UserId { get; set; }

    public string? Status { get; set; }

    public string? CreatedBy { get; set; }

    public string? ModifiedBy { get; set; }

    public DateTime? CreatedUTCDate { get; set; }

    public DateTime? ModifiedUTCDate { get; set; }

    public virtual TemplateVersion? TemplateVersion { get; set; } = null!;
    public virtual ICollection<TemplateSurveyResponse>? TemplateSurveyResponses { get; set; } = new List<TemplateSurveyResponse>();
}
