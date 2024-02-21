using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using DDDNetcore.Domain.Relacoes;
using DDDNetCore.Domain.Relacoes;
using DDDNetcore.Domain.Tags;
using DDDNetCore.Domain.Tags;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Relacoes;


namespace DDDNetcore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RelacoesController : ControllerBase
    {
        private readonly IRelacaoService _service;
        private readonly ITagService _tagService;

        public RelacoesController(IRelacaoService service,ITagService tagService)
        {
            _service = service;
            _tagService = tagService;
        }
        // GET: api/Relacoes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RelacaoDto>>> GetAll()
        {
            return await _service.GetAllAsync();
        }
        // GET: api/Relacoes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RelacaoDto>> GetGetById(Guid id)
        {
            var rel = await _service.GetByIdAsync(new RelacaoId(id));

            if (rel == null)
            {
                return NotFound();
            }

            return rel;
        }

        [HttpGet("idJogador/{jogadorid}")]
        public async Task<ActionResult<IEnumerable<RelacaoDto>>> GetRelacoesByJogador(string jogadorid)
        {
            return await _service.getRelacoes(new JogadorId(jogadorid));
        }
        /*
        // POST: api/Relacoes
        [HttpPost]
        public async Task<ActionResult<RelacaoDto>> Create(CreatingRelacaoDto dto)
        {
            try
            {
                var rel = await _service.AddAsync(dto);

                return CreatedAtAction(nameof(GetGetById), new { id = rel.Id }, rel);
            }
            catch(BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }
        */
        
        // PUT: api/Relacoes/5
        [HttpPut("{id}")]
        public async Task<ActionResult<RelacaoDto>> Update(Guid id, RelacaoDto dto)
        {
            if (id != dto.Id)
            {
                return BadRequest();
            }

            try
            {
                var rel = await _service.UpdateAsync(dto);
                
                if (rel == null)
                {
                    return NotFound();
                }
                return rel;
            }
            catch(BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }

        /*
        // Inactivate: api/Relacoes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<RelacaoDto>> SoftDelete(Guid id)
        {
            var rel = await _service.InactivateAsync(new RelacaoId(id));

            if (rel == null)
            {
                return NotFound();
            }

            return Ok(rel);
        }*/
        
        // DELETE: api/Relacoes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<RelacaoDto>> HardDelete(Guid id)
        {
            try
            {
                var rel = await _service.DeleteAsync(new RelacaoId(id));

                if (rel == null)
                {
                    return NotFound();
                }

                return rel;
            }
            catch(BusinessRuleValidationException ex)
            {
               return BadRequest(new {Message = ex.Message});
            }
        }
        
        
        [HttpGet("idTag/{tagId}")]
        public async Task<ActionResult<TagDto>> GetTagsByID(String tagId)
        {
             var rel = await _tagService.getTagsByID(tagId);

            if (rel == null)
            {
                return NotFound();
            }

            return rel;
        }
        
        [HttpGet("forcaPrimeiroN/{id}")]
        public async Task<ActionResult<String>> forcaPrimeiroN(String id){
         var relacoes=  await _service.getRelacoes(new JogadorId(id));
         int nr = 0;
         foreach (var VARIABLE in relacoes)
         {
             nr += VARIABLE.ForcaLigacao;
         }

         return nr+"";
        }
        
        [HttpGet("atualizarForcaRelacaoAbaixo/{id}/{id2}")]
        public async Task<ActionResult<RelacaoDto>> atualizarForcaRelacaoAbaixo(String id,String id2){
            if (true)
            {
                Console.WriteLine("OLA");
            }
            var relacoes=  await _service.getRelacoes(new JogadorId(id));
            RelacaoDto relacao = null;
            foreach (var VARIABLE in relacoes)
            {
                if (VARIABLE.JogadorA.Equals(id2) || VARIABLE.JogadorB.Equals(id2))
                {
                    relacao = VARIABLE;
                }
            }

            if (relacao != null)
            {
                relacao.ForcaRelacao -= 1;
                return await _service.UpdateAsync(relacao);
            }
            
            return null;
        }
        [HttpGet("atualizarForcaRelacaoAcima/{id}/{id2}")]
        public async Task<ActionResult<RelacaoDto>> atualizarForcaRelacaoAcima(String id,String id2){
            var relacoes=  await _service.getRelacoes(new JogadorId(id));
            RelacaoDto relacao = null;
            foreach (var VARIABLE in relacoes)
            {
                if (VARIABLE.JogadorA.Equals(id2) || VARIABLE.JogadorB.Equals(id2))
                {
                    relacao = VARIABLE;
                }
            }

            if (relacao != null)
            {
                relacao.ForcaRelacao += 1;
                return await _service.UpdateAsync(relacao);
            }
            
            return null;
        }
        
    }
}