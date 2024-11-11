using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Api.Models;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TemplateFieldController : ControllerBase
    {
        private readonly CamDbContext _context;

        public TemplateFieldController(CamDbContext context)
        {
            _context = context;
        }

        // GET: api/TemplateField
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TemplateField>>> GetTemplateFields()
        {
            return await _context.TemplateFields.ToListAsync();
        }

        // GET: api/TemplateField/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TemplateField>> GetTemplateField(int id)
        {
            var templateField = await _context.TemplateFields.FindAsync(id);

            if (templateField == null)
            {
                return NotFound();
            }

            return templateField;
        }

        // PUT: api/TemplateField/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut()]
        public async Task<IActionResult> PutTemplateField([FromBody] TemplateField templateField)
        {
            // if (id != templateField.Id)
            // {
            //     return BadRequest();
            // }

            _context.Entry(templateField).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TemplateFieldExists(templateField.Id))
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
        public async Task<ActionResult<TemplateField>> PostTemplateField(TemplateField templateField)
        {
            _context.TemplateFields.Add(templateField);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTemplateField", new { id = templateField.Id }, templateField);
        }

        // DELETE: api/TemplateField/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTemplateField(int id)
        {
            var templateField = await _context.TemplateFields.FindAsync(id);
            if (templateField == null)
            {
                return NotFound();
            }

            _context.TemplateFields.Remove(templateField);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TemplateFieldExists(int id)
        {
            return _context.TemplateFields.Any(e => e.Id == id);
        }
    }
}
