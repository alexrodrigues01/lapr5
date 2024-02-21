using System.Collections.Generic;
using System.Threading.Tasks;
using DDDNetcore.Domain.Relacoes;
using DDDNetCore.Domain.Relacoes;
using DDDNetcore.Domain.Tags;
using DDDNetCore.Domain.Tags;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.Tags;
using Microsoft.AspNetCore.Mvc;

namespace DDDSample1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagsController : ControllerBase
    {
        private readonly IJogadorService _jogadorService;
        private readonly ITagService _tagService;
        private readonly IRelacaoService _relacaoService;

        public TagsController(ITagService tagService, IJogadorService jogadorService, IRelacaoService relacaoService)
        {
            _jogadorService = jogadorService;
            _tagService = tagService;
            _relacaoService = relacaoService;
        }

        // GET: api/Tags
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TagDto>>> GetAll()
        {
            return await _tagService.GetAllAsync();
        }

        //GET: api/tJogadores
        [HttpGet("tJogadores")]
        public async Task<ActionResult<List<TagDto>>> getTagsJogadores()
        {
            var jogadores = await _jogadorService.GetAllAsync();
            List<TagidString> tagidStrings = new List<TagidString>();
            List<TagDto> tagsFinal = new List<TagDto>();
            foreach (var jogador in jogadores)
            {
                foreach (var tag in jogador.InterestTags)
                {
                    if (!tagidStrings.Contains(tag))
                        tagidStrings.Add(tag);
                }
            }

            var tags = await _tagService.GetAllAsync();

            foreach (var tagid in tagidStrings)
            {
                foreach (var tag in tags)
                {
                    if (tag.Id.ToString().Equals(tagid.tagid) && !tagsFinal.Contains(tag))
                        tagsFinal.Add(tag);
                }
            }

            return tagsFinal;
        }

        //GET: api/tRelacoes
        [HttpGet("tRelacoes")]
        public async Task<ActionResult<List<TagDto>>> getTagsRelacoes()
        {
            var relacoes = await _relacaoService.GetAllAsync();
            List<TagidString> tagidStrings = new List<TagidString>();
            List<TagDto> tagsFinal = new List<TagDto>();
            foreach (var relacao in relacoes)
            {
                foreach (var tag in relacao.ListaTags)
                {
                    if (!tagidStrings.Contains(tag))
                        tagidStrings.Add(tag);
                }
            }

            var tags = await _tagService.GetAllAsync();

            foreach (var tagid in tagidStrings)
            {
                foreach (var tag in tags)
                {
                    if (tag.Id.ToString().Equals(tagid.tagid) && !tagsFinal.Contains(tag))
                        tagsFinal.Add(tag);
                }
            }

            return tagsFinal;
        }


        //GET: api/tJogador/id
        [HttpGet("tJogador/{id}")]
        public async Task<ActionResult<List<TagDto>>> getTagsJogador(string id)
        {
            JogadorDto jogadorDto= await _jogadorService.GetByIdAsync(new JogadorId(id));
            var tags = await _tagService.GetAllAsync();
            List<TagDto> tagsFinal = new List<TagDto>();
            
            foreach (var tag in tags)
            {
                foreach (var tagid in jogadorDto.InterestTags)
                {
                    if(tag.Id.ToString().Equals(tagid.tagid))
                        tagsFinal.Add(tag);
                }
            }

            return tagsFinal;
        }
        
        //GET: api/tRelacoesJog/id
        [HttpGet("tRelacoesJog/{id}")]
        public async Task<ActionResult<List<TagDto>>> getTagsRelacaoJog(string id)
        {
            List <RelacaoDto> relacoes = await _relacaoService.getRelacoes(new JogadorId(id));
            List<TagidString> tagidStrings = new List<TagidString>();
            List<TagDto> tagsFinal = new List<TagDto>();
            foreach (var relacao in relacoes)
            {
                foreach (var tag in relacao.ListaTags)
                {
                    if (!tagidStrings.Contains(tag))
                        tagidStrings.Add(tag);
                }
            }

            var tags = await _tagService.GetAllAsync();

            foreach (var tagid in tagidStrings)
            {
                foreach (var tag in tags)
                {
                    if (tag.Id.ToString().Equals(tagid.tagid) && !tagsFinal.Contains(tag))
                        tagsFinal.Add(tag);
                }
            }

            return tagsFinal;
            
        }
    }
}