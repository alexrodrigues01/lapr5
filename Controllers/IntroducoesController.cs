using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DDDSample1.Domain.Families;
using DDDSample1.Domain.Introducoes;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.PedidosLigacao;
using DDDSample1.Domain.Shared;
using Microsoft.AspNetCore.Mvc;

namespace DDDNetCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IntroducoesController : ControllerBase
    {
        private readonly IIntroducaoService _service;

        public IntroducoesController(IIntroducaoService service)
        {
            _service = service;
        }

        // GET: api/introducoes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<IntroducaoDto>>> GetAll()
        {
            return await _service.GetAllAsync();
        }
        
        [HttpPost]
        public async Task<ActionResult<IntroducaoDto>> Create(CreatingIntroducaoDto dto)
        {
             var introducao = await _service.AddAsync(dto);
             
            return new IntroducaoDto()
            {
                Id=introducao.Id,MensagemIntroducaoIntermedio = introducao.MensagemIntroducaoIntermedio,MensagemIntroducaoObjetivo = introducao.MensagemIntroducaoObjetivo,
                JogadorIntermedio = introducao.JogadorIntermedio,JogadorInicio = introducao.JogadorInicio,JogadorObjetivo = introducao.JogadorObjetivo
            };
        }

        [HttpDelete("aprov{flag},{id}")]
        public async Task<ActionResult<PedidoLigacaoDto>> Delete(Guid Id, string flag)
        {
            try
            {
            var introDto = await _service.DeleteAsync(new IntroducaoId(Id),flag);
            
            if (introDto == null)
            {
                return Ok(new {Message = "Eliminado ou inexistente"});
            }

            return introDto;
        }
        catch(BusinessRuleValidationException ex)
        {
            return BadRequest(new {Message = ex.Message});
        }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<IntroducaoDto>>> GetIntroducoesByUser(string id)
        {
            return await _service.GetIntroducoesByUser(id);
        }
        
        
    }
}