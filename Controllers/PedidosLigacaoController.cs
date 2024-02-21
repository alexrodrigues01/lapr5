using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DDDNetcore.Domain.Relacoes;
using DDDSample1.ALGAV;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.PedidosLigacao;
using DDDSample1.Domain.Shared;
using Microsoft.AspNetCore.Mvc;

namespace DDDSample1.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    
    public class PedidosLigacaoController : ControllerBase
    {
        private readonly IPedidoLigacaoService _service;
        private readonly IIA _ai;

        public PedidosLigacaoController(IPedidoLigacaoService service,IIA ai)
        {
            _ai = ai;
            _service = service;
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<PedidoLigacaoDto>> GetById(Guid id)
        {
            var pedo = await _service.GetByIdAsync(new PedidoLigacaoId(id));

            if (pedo == null)
                return NotFound();
            return pedo;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PedidoLigacaoDto>>> getAll()
        {
            return await _service.GetAllAsync();
        }
        
        // POST: api/PedidosLigacao
        [HttpPost]
        public async Task<ActionResult<PedidoLigacaoDto>> Create(CreatingPedidoLigacaoDto dto)
        {
            var pedo = await _service.AddAsync(dto);

            return pedo;
        }
        
        // DELETE: api/PedidosLigacao
        [HttpDelete("{id},decis{flag}")]
        public async Task<ActionResult<RelacaoDto>> Delete(Guid id, string flag,CreatingRelacaoDto dto)
        {
            try
            {
                var rel = await _service.DeleteAsync(new PedidoLigacaoId(id), flag, dto);

                if (rel == null)
                {
                    return NotFound();
                }

                await _ai.adicionarRelacionamento(rel);
                return rel;
            }
            catch(BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }
        [HttpPost("{id}/{jogadoresIds}")]
        public async Task<ActionResult<IEnumerable<PedidoLigacaoDto>>> CreatePedidos(Guid id,String jogadoresIds)
        {
            return await _service.AddAsync(id,jogadoresIds);
        }
        
        
        [HttpGet("idjogador,{idjogador}")]
        public async Task<ActionResult<IEnumerable<PedidoLigacaoDto2>>> getPedidosLigacaoPendentes(string idjogador)
        {
            return await _service.getPedidosLigacaoPendentes(idjogador);
        }

        [HttpDelete("{id}/hard")]
        public async Task<ActionResult<PedidoLigacaoDto>> HardDelete(Guid id)
        {
            try
            {
                var fam = await _service.DeleteAsync(new PedidoLigacaoId(id));

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