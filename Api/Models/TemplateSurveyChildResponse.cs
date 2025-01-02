namespace Api.Models;

public partial class TemplateSurveyChildResponse
{
    public int Id { get; set; }

    public int TemplateSurveyResponseId { get; set; }

    public int TemplateFieldId { get; set; }

    public string? Response { get; set; }

    public string? CreatedBy { get; set; }

    public string? ModifiedBy { get; set; }

    public DateTime? CreatedUTCDate { get; set; }

    public DateTime? ModifiedUTCDate { get; set; }

    public virtual TemplateSurveyResponse? TemplateSurveyResponse { get; set; } = null!;
    public virtual TemplateField? TemplateField { get; set; } = null!;
}
