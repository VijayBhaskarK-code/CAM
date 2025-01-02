using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Api.Models;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TemplateSurveyResponseController : ControllerBase
    {
        private readonly CamDbContext _context;

        public TemplateSurveyResponseController(CamDbContext context)
        {
            _context = context;
        }

        // GET: api/TemplateField
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TemplateSurveyResponse>>> GetSurveyResponses()
        {
            return await _context.TemplateSurveyResponses.ToListAsync();
        }

        // GET: api/TemplateField/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TemplateSurveyResponse>> GetSurveyResponse(int id)
        {
            var templateSurveyResponse = await _context.TemplateSurveyResponses.FindAsync(id);

            if (templateSurveyResponse == null)
            {
                return NotFound();
            }

            return templateSurveyResponse;
        }

        // PUT: api/TemplateField/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut()]
        public async Task<IActionResult> PutTemplateField([FromBody] TemplateSurveyResponse surveyResponse)
        {
            // if (id != templateField.Id)
            // {
            //     return BadRequest();
            // }

            _context.Entry(surveyResponse).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SurveyResponseExists(surveyResponse.Id))
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

        [HttpPut("updates")]
        public async Task<IActionResult> PutResponses([FromBody] TemplateSurveyResponse[] surveyResponses)
        {
            // if (id != templateField.Id)
            // {
            //     return BadRequest();
            // }

            foreach(var surveyResponse in surveyResponses)
            _context.Entry(surveyResponse).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                //if (!SurveyResponseExists(surveyResponse.Id))
                {
                    return NotFound();
                }
                // else
                // {
                //     throw;
                // }
            }

            return NoContent();
        }

        // POST: api/TemplateField
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TemplateSurveyResponse>> PostSurveyResponse(TemplateSurveyResponse surveyResponse)
        {
            _context.TemplateSurveyResponses.Add(surveyResponse);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTemplateField", new { id = surveyResponse.Id }, surveyResponse);
        }

        // DELETE: api/TemplateField/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSurveyResponse(int id)
        {
            var surveyResponse = await _context.TemplateSurveyResponses.FindAsync(id);
            if (surveyResponse == null)
            {
                return NotFound();
            }

            _context.TemplateSurveyResponses.Remove(surveyResponse);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SurveyResponseExists(int id)
        {
            return _context.TemplateSurveyResponses.Any(e => e.Id == id);
        }
    }
}
