using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Api.Models;
using Microsoft.Identity.Client;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TemplateSurveyController : ControllerBase
    {
        private readonly CamDbContext _context;

        public TemplateSurveyController(CamDbContext context)
        {
            _context = context;
        }

        // GET: api/TemplateField
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TemplateSurvey>>> GetTemplateSurveys()
        {
            return await _context.TemplateSurveys.ToListAsync();
        }

        // GET: api/TemplateField/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TemplateSurvey>> GetTemplateSurvey(int id)
        {
            var templateField = await _context.TemplateSurveys
        .Include(a => a.TemplateSurveyResponses)
            .Include(a => a.TemplateVersion)
                .ThenInclude(a => a.TemplatePanels)
                .ThenInclude(a => a.TemplateSections)
                    .ThenInclude(a => a.TemplateFields)
                    .FirstOrDefaultAsync(a => a.Id == id);

            if (templateField == null)
            {
                return NotFound();
            }

            return templateField;
        }

        // PUT: api/TemplateField/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut()]
        public async Task<IActionResult> PutTemplateSurvey([FromBody] TemplateSurvey templateSurvey)
        {
            // if (id != templateField.Id)
            // {
            //     return BadRequest();
            // }
            foreach (var surveyResponse in templateSurvey.TemplateSurveyResponses)
            {
                if (surveyResponse.Id == 0)
                    _context.Entry(surveyResponse).State = EntityState.Added;
                else
                    _context.Entry(surveyResponse).State = EntityState.Modified;
            }

            _context.Entry(templateSurvey).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TemplateSurveyExists(templateSurvey.Id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/TemplateField
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TemplateSurvey>> PostTemplateSurvey(TemplateSurvey templateSurvey)
        {
            _context.TemplateSurveys.Add(templateSurvey);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTemplateSurvey", new { id = templateSurvey.Id }, templateSurvey);
        }

        // DELETE: api/TemplateField/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTemplateSurvey(int id)
        {
            var templateSurvey = await _context.TemplateSurveys.FindAsync(id);
            if (templateSurvey == null)
            {
                return NotFound();
            }

            _context.TemplateSurveys.Remove(templateSurvey);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TemplateSurveyExists(int id)
        {
            return _context.TemplateSurveys.Any(e => e.Id == id);
        }
    }
}
