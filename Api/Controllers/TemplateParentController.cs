using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Api.Models;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TemplateParentController : ControllerBase
    {
        private readonly CamDbContext _context;

        public TemplateParentController(CamDbContext context)
        {
            _context = context;
        }

        // GET: api/TemplateParent
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TemplateParent>>> GetTemplateParents()
        {
            return await _context.TemplateParents.Include(a => a.TemplateVersions).ToListAsync();
        }

        // GET: api/TemplateParent/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TemplateParent>> GetTemplateParent(int id)
        {
            var templateParent = await _context.TemplateParents.Include(a => a.TemplateVersions).FirstOrDefaultAsync(a => a.Id == id);

            if (templateParent == null)
            {
                return NotFound();
            }

            return templateParent;
        }

        // PUT: api/TemplateParent/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTemplateParent(int id, TemplateParent templateParent)
        {
            if (id != templateParent.Id)
            {
                return BadRequest();
            }

            _context.Entry(templateParent).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TemplateParentExists(id))
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

        // POST: api/TemplateParent
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TemplateParent>> PostTemplateParent(TemplateParent templateParent)
        {
            _context.TemplateParents.Add(templateParent);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTemplateParent", new { id = templateParent.Id }, templateParent);
        }

        // DELETE: api/TemplateParent/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTemplateParent(int id)
        {
            var templateParent = await _context.TemplateParents.FindAsync(id);
            if (templateParent == null)
            {
                return NotFound();
            }

            _context.TemplateParents.Remove(templateParent);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TemplateParentExists(int id)
        {
            return _context.TemplateParents.Any(e => e.Id == id);
        }
    }
}
