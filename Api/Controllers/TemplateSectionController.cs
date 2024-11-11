using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Api.Models;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TemplateSectionController : ControllerBase
    {
        private readonly CamDbContext _context;

        public TemplateSectionController(CamDbContext context)
        {
            _context = context;
        }

        // GET: api/TemplateSection
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TemplateSection>>> GetTemplateSections()
        {
            return await _context.TemplateSections.ToListAsync();
        }

        // GET: api/TemplateSection/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TemplateSection>> GetTemplateSection(int id)
        {
            var templateSection = await _context.TemplateSections.FindAsync(id);

            if (templateSection == null)
            {
                return NotFound();
            }

            return templateSection;
        }

        // PUT: api/TemplateSection/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut()]
        public async Task<IActionResult> PutTemplateSection([FromBody] TemplateSection templateSection)
        {
            // if (id != templateSection.Id)
            // {
            //     return BadRequest();
            // }

            _context.Entry(templateSection).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TemplateSectionExists(templateSection.Id))
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

        // POST: api/TemplateSection
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TemplateSection>> PostTemplateSection(TemplateSection templateSection)
        {
            _context.TemplateSections.Add(templateSection);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTemplateSection", new { id = templateSection.Id }, templateSection);
        }

        // DELETE: api/TemplateSection/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTemplateSection(int id)
        {
            var templateSection = await _context.TemplateSections.FindAsync(id);
            if (templateSection == null)
            {
                return NotFound();
            }

            _context.TemplateSections.Remove(templateSection);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TemplateSectionExists(int id)
        {
            return _context.TemplateSections.Any(e => e.Id == id);
        }
    }
}
