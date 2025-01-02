namespace Api.Models;

public partial class TemplateSurveyResponse
{
    public int Id { get; set; }

    public int TemplateSurveyId { get; set; }

    public int TemplateFieldId { get; set; }

    public string? Response { get; set; }

    public string? CreatedBy { get; set; }

    public string? ModifiedBy { get; set; }

    public DateTime? CreatedUTCDate { get; set; }

    public DateTime? ModifiedUTCDate { get; set; }

    public virtual TemplateSurvey? TemplateSurvey { get; set; } = null!;

    public virtual TemplateField? TemplateField { get; set; } = null!;

    public virtual ICollection<TemplateSurveyChildResponse> TemplateSurveyChildResponses { get; set; } = new List<TemplateSurveyChildResponse>();
}
