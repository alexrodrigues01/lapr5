using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.EstadosHumor;

namespace DDDSample1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EstadosHumorController : ControllerBase
    {
        private readonly IEstadoHumorService _service;
        
        public EstadosHumorController(IEstadoHumorService service)
        {
            _service = service;
        }
        
        // GET: api/estadoshumor
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EstadoHumorDto>>> GetAll()
        {
            return await _service.GetAllAsync();
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<EstadoHumorDto>> GetById(Guid id)
        {
            var jog = await _service.GetByIdAsync(new EstadoHumorId(id));

            if (jog == null)
                return NotFound();
            return jog;
        }
        
        [HttpPost]
        public async Task<ActionResult<EstadoHumorDto>> Create(CreatingEstadoHumorDto dto)
        {
            var estado = await _service.AddAsync(dto);

          return new EstadoHumorDto { Id = estado.Id, DataEstadoHumor = estado.DataEstadoHumor,Estado = estado.Estado};
        }
        
        // PUT: api/estadoshumor/5
        [HttpPut("{id}")]
        public async Task<ActionResult<EstadoHumorDto>> Update(Guid id,EstadoHumorDto dto)
        {
            try
            {
                var jog = await _service.UpdateAsync(dto);
                
                if (jog == null)
                {
                    return NotFound();
                }
                return jog;
            }
            catch(BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
            
        }
        
        [HttpDelete("{id}/hard")]
        public async Task<ActionResult<EstadoHumorDto>> HardDelete(String id)
        {
            try
            {
                var fam = await _service.DeleteAsync(new EstadoHumorId(id));

                if (fam == null)
                {
                    return NotFound();
                }

                return fam;
            }
            catch(BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }
        
    }
    
    
}