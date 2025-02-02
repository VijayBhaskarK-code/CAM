using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Api.Models;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TemplatePanelController : ControllerBase
    {
        private readonly CamDbContext _context;

        public TemplatePanelController(CamDbContext context)
        {
            _context = context;
        }

        // GET: api/TemplatePanel
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TemplatePanel>>> GetTemplatePanels()
        {
            return await _context.TemplatePanels.ToListAsync();
        }

        // GET: api/TemplatePanel/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TemplatePanel>> GetTemplatePanel(int id)
        {
            var templatePanel = await _context.TemplatePanels.FindAsync(id);

            if (templatePanel == null)
            {
                return NotFound();
            }

            return templatePanel;
        }

        // PUT: api/TemplatePanel/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut()]
        public async Task<IActionResult> PutTemplatePanel([FromBody] TemplatePanel templatePanel)
        {
            // if (id != templatePanel.Id)
            // {
            //     return BadRequest();
            // }

            _context.Entry(templatePanel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TemplatePanelExists(templatePanel.Id))
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

        // POST: api/TemplatePanel
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TemplatePanel>> PostTemplatePanel(TemplatePanel templatePanel)
        {
            _context.TemplatePanels.Add(templatePanel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTemplatePanel", new { id = templatePanel.Id }, templatePanel);
        }

        // DELETE: api/TemplatePanel/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTemplatePanel(int id)
        {
            var templatePanel = await _context.TemplatePanels.FindAsync(id);
            if (templatePanel == null)
            {
                return NotFound();
            }

            _context.TemplatePanels.Remove(templatePanel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TemplatePanelExists(int id)
        {
            return _context.TemplatePanels.Any(e => e.Id == id);
        }
    }
}
