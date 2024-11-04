using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Api.Models;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TemplateVersionController : ControllerBase
    {
        private readonly CamDbContext _context;

        public TemplateVersionController(CamDbContext context)
        {
            _context = context;
        }

        // GET: api/TemplateVersion
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TemplateVersion>>> GetTemplateVersions()
        {
            return await _context.TemplateVersions.ToListAsync();
        }

        // GET: api/TemplateVersion/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TemplateVersion>> GetTemplateVersion(int id)
        {
            var templateVersion = await _context.TemplateVersions.FindAsync(id);

            if (templateVersion == null)
            {
                return NotFound();
            }

            return templateVersion;
        }

        // PUT: api/TemplateVersion/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTemplateVersion(int id, TemplateVersion templateVersion)
        {
            if (id != templateVersion.Id)
            {
                return BadRequest();
            }

            _context.Entry(templateVersion).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TemplateVersionExists(id))
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

        // POST: api/TemplateVersion
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TemplateVersion>> PostTemplateVersion(TemplateVersion templateVersion)
        {
            _context.TemplateVersions.Add(templateVersion);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTemplateVersion", new { id = templateVersion.Id }, templateVersion);
        }

        // DELETE: api/TemplateVersion/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTemplateVersion(int id)
        {
            var templateVersion = await _context.TemplateVersions.FindAsync(id);
            if (templateVersion == null)
            {
                return NotFound();
            }

            _context.TemplateVersions.Remove(templateVersion);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TemplateVersionExists(int id)
        {
            return _context.TemplateVersions.Any(e => e.Id == id);
        }
    }
}
