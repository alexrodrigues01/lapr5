using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Collections;
using System.Linq;
using System.Threading.Tasks;
using DDDNetcore.Domain.Relacoes;
using DDDNetCore.Domain.Relacoes;
using DDDSample1.ALGAV;
using DDDSample1.Domain.EstadosHumor;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.Shared;
using DDDSample1.Utils;
using Microsoft.AspNetCore.Cors;


namespace DDDSample1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JogadoresController : ControllerBase
    {
        private readonly IJogadorService _service;
        private readonly IRelacaoService _serviceRelacoes;

        private readonly EstadoHumorService _estadoHumorService;

        private readonly IIA _ai;

        public JogadoresController(IJogadorService service, IRelacaoService relacaoService, IIA ai)
        {
            _service = service;
            _serviceRelacoes = relacaoService;
            _ai = ai;
        }

        // GET: api/Jogadores
        [HttpGet]
        public async Task<ActionResult<IEnumerable<JogadorDto>>> GetAll()
        {
            return await _service.GetAllAsync();
        }

        // GET: api/Jogadores/GetAllNaoAmigos
        [HttpGet("GetAllNaoAmigos/{id}")]
        public async Task<ActionResult<IEnumerable<JogadorDto>>> GetAllNaoAmigos(String id)
        {
            var jogadores = await _service.GetAllAsync();
            var jogadoresFinal = new List<JogadorDto>();
            var relacoes = await _serviceRelacoes.getRelacoes(new JogadorId(id));
            foreach (var jogador in jogadores)
            {
                if (relacoes.Count == 0)
                    return jogadores;
                foreach (var relacao in relacoes)
                {
                    if (!(relacao.JogadorA.Equals(jogador.Id.ToString()) ||
                          relacao.JogadorB.Equals(jogador.Id.ToString())))
                    {
                        if (!jogadoresFinal.Contains(jogador))
                            jogadoresFinal.Add(jogador);
                    }
                }
            }

            return jogadoresFinal;
        }

        // POST: api/Jogadores
        [HttpPost]
        public async Task<ActionResult<JogadorDto>> Create(CreatingJogadorDto dto)
        {
            var jog = await _service.AddAsync(dto);
            await _ai.adicionarUtilizador(jog);

            return jog;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<JogadorDto>> GetById(Guid id)
        {
            var jog = await _service.GetByIdAsync(new JogadorId(id));

            if (jog == null)
                return NotFound();
            return jog;
        }


        [HttpGet("{id}&{idObjetivo}")]
        public async Task<ActionResult<IEnumerable<JogadorDto>>> GetJogadoresIntermedios(Guid id, Guid idObjetivo)
        {
            var relacoes = await _serviceRelacoes.getRelacoes(new JogadorId(id));
            var relacoesObjetivo = await _serviceRelacoes.getRelacoes(new JogadorId(idObjetivo));
            var jogadoresAmigosPrincipal = new List<String>();
            var jogadoresAmigosObjetivo = new List<String>();
            var jogadores = new List<JogadorDto>();

            foreach (var relacao in relacoes)
            {
                if (!relacao.JogadorA.Equals(id.ToString()))
                {
                    jogadoresAmigosPrincipal.Add(relacao.JogadorA);
                }
                else
                {
                    jogadoresAmigosPrincipal.Add(relacao.JogadorB);
                }
            }

            foreach (var relacao in relacoesObjetivo)
            {
                if (!relacao.JogadorA.Equals(idObjetivo.ToString()))
                {
                    jogadoresAmigosObjetivo.Add(relacao.JogadorA);
                }
                else
                {
                    jogadoresAmigosObjetivo.Add(relacao.JogadorB);
                }
            }

            foreach (var jogador in jogadoresAmigosObjetivo)
            {
                if (jogadoresAmigosPrincipal.Contains(jogador))
                {
                    jogadores.Add(_service.GetByIdAsync(new JogadorId(jogador)).Result);
                }
            }

            return jogadores;
        }

        [HttpGet("boot")]
        public async Task<string> boot()
        {
            List<JogadorDto> jogadores = await _service.GetAllAsync();
            List<RelacaoDto> relacoes = await _serviceRelacoes.GetAllAsync();

            return await _ai.boot(jogadores, relacoes);
        }

        //PUT: api/Jogadores/id
        [HttpPut("{id}")]
        public async Task<ActionResult<JogadorDto>> Update(Guid id, PutJogadorDto dto)
        {
            if (id != dto.Id)
            {
                return BadRequest();
            }

            try
            {
                var jogador = await _service.UpdateAsync(dto);

                if (jogador == null)
                {
                    return NotFound();
                }

                return jogador;
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }

        [HttpGet("tel,{telemovel}")]
        public async Task<ActionResult<JogadorDto>> getJogadorByTelemovel(String telemovel)
        {
            return await _service.getJogadorByTelemovel(telemovel);
        }

        [HttpGet("n,{nome}")]
        public async Task<ActionResult<JogadorDto>> getJogadorByNome(String nome)
        {
            return await _service.getJogadorByNome(nome);
        }

        [HttpGet("e,{email}")]
        public async Task<ActionResult<JogadorDto>> getJogadorByEmail(String email)
        {
            return await _service.getJogadorByEmail(email);
        }

        [HttpGet("p,{pais}")]
        public async Task<ActionResult<List<JogadorDto>>> getJogadoresByPais(String pais)
        {
            return await _service.getJogadoresByPais(pais);
        }

        [HttpGet("t,{tag}")]
        public async Task<ActionResult<List<JogadorDto>>> getJogadoresByTag(string tag)
        {
            return await _service.getJogadoresByTag(tag);
        }

        [HttpGet("jogadoresobjetivo/{id}")]
        public async Task<ActionResult<List<JogadorDto>>> getJogadoresObjetivo(string id)
        {
            var jogadores = await _service.getJogadoresObjetivo(id);
            var jogadoresFinal = new List<JogadorDto>();
            var relacoes = await _serviceRelacoes.getRelacoes(new JogadorId(id));
            foreach (var jogador in jogadores)
            {
                if (relacoes.Count == 0)
                    return jogadores;
                foreach (var relacao in relacoes)
                {
                    if (!(relacao.JogadorA.Equals(jogador.Id.ToString()) ||
                          relacao.JogadorB.Equals(jogador.Id.ToString())))
                    {
                        if (!jogadoresFinal.Contains(jogador))
                            jogadoresFinal.Add(jogador);
                    }
                }
            }

            return jogadoresFinal;
        }

        [HttpGet("u{jogadorID},{nivel}")]
        public async Task<ActionResult<HashSet<JogadorDto>>> getRedeAmigos(string jogadorId, int nivel)
        {
            JogadorDto inicial = await _service.GetByIdAsync(new JogadorId(jogadorId));

            HashSet<JogadorDto> active = new HashSet<JogadorDto>();
            active.Add(inicial);

            HashSet<JogadorDto> total = new HashSet<JogadorDto>();

            await recursive(new Pair<HashSet<JogadorDto>, HashSet<JogadorDto>>(active, total), nivel);

            return total;
        }

        [HttpGet("u{jogadorID}/{nivel}")]
        public async Task<ActionResult<List<String>>> getRedeAmigos2(string jogadorId, int nivel)
        {
            JogadorDto inicial = await _service.GetByIdAsync(new JogadorId(jogadorId));
            relacaoDtos = await _serviceRelacoes.GetAllAsync();
            jogadorDtos = await _service.GetAllAsync();
            List<JogadorDto> active = new List<JogadorDto>();
            List<RelacaoDto> final = new List<RelacaoDto>();
            auxiliar(nivel, active, inicial, null, final);
            List<String> email = new List<string>();
            foreach (var relacao in final)
            {
                email.Add(getJogadorById(relacao.JogadorA).Email + "," + getJogadorById(relacao.JogadorB).Email);
            }

            return email;
        }

        private List<RelacaoDto> relacaoDtos;
        private List<JogadorDto> jogadorDtos;

        public List<RelacaoDto> getRelacaoByIdJogador(String id)
        {
            List<RelacaoDto> relacaoDtos2 = new List<RelacaoDto>();
            foreach (var relacao in relacaoDtos)
            {
                if (relacao.JogadorA.Equals(id) || relacao.JogadorB.Equals(id))
                {
                    relacaoDtos2.Add(relacao);
                }
            }

            return relacaoDtos2;
        }

        public JogadorDto getJogadorById(String id)
        {
            foreach (var jogador in jogadorDtos)
            {
                if (jogador.Id.ToString().Equals(id))
                {
                    return jogador;
                }
            }

            return null;
        }

        private List<int> listaNiveis = new List<int>();
        private List<String> nodes = new List<string>();
        private async void auxiliar(int nivel, List<JogadorDto> jogadorDtos, JogadorDto jogadorDto, RelacaoDto relacao1,
            List<RelacaoDto> relacaoDtos)
        {

            if (nivel == 0 || jogadorDto == null)
            {
                return;
            }

            if (!jogadorDtos.Contains(jogadorDto))
            {
                jogadorDtos.Add(jogadorDto);
            }
            

            if (relacao1 != null && !relacaoDtos.Contains(relacao1))
            {
                 relacaoDtos.Add(relacao1);
                 listaNiveis.Add(nivel);
            }
            else
            {
                if (relacaoDtos.Contains(relacao1))
                {
                    if (listaNiveis[relacaoDtos.IndexOf(relacao1)] < nivel)
                    {
                        listaNiveis[relacaoDtos.IndexOf(relacao1)] = nivel;
                    }
                }
            }

            foreach (var relacao in getRelacaoByIdJogador(jogadorDto.Id.ToString()))
            {
                JogadorDto jogadorDtoAux = null;
                if (relacao.JogadorA.Equals(jogadorDto.Id.ToString()))
                {
                    jogadorDtoAux = getJogadorById(relacao.JogadorB);;
                }
                else
                {
                    jogadorDtoAux = getJogadorById(relacao.JogadorA);
                }
                
                auxiliar(nivel - 1, jogadorDtos, jogadorDtoAux, relacao, relacaoDtos);
            }
        }


        public async Task recursive(Pair<HashSet<JogadorDto>, HashSet<JogadorDto>> pair, int nivel)
        {
            if (nivel == 0)
            {
                return;
            }

            HashSet<JogadorDto> temp = new HashSet<JogadorDto>();

            foreach (JogadorDto jog in pair.First)
            {
                List<RelacaoDto> rels = await _serviceRelacoes.getRelacoes(new JogadorId(jog.Id));

                HashSet<string> novosIds = new HashSet<string>();

                foreach (RelacaoDto r in rels)
                {
                    if (!r.JogadorA.Equals(new JogadorId(jog.Id)) && !novosIds.Contains(jog.Id.ToString()) &&
                        !novosIds.Contains(r.JogadorA))
                    {
                        novosIds.Add(r.JogadorA);
                    }

                    if (!r.JogadorB.Equals(new JogadorId(jog.Id)) && !novosIds.Contains(jog.Id.ToString()) &&
                        !novosIds.Contains(r.JogadorB))
                    {
                        novosIds.Add(r.JogadorB);
                    }
                }

                foreach (string jid in novosIds)
                {
                    JogadorDto jogador = await _service.GetByIdAsync(new JogadorId(jid));

                    if (!temp.Contains(jogador))
                    {
                        temp.Add(jogador);
                    }
                }
            }

            pair.First.Clear();
            pair.First = new HashSet<JogadorDto>(temp);

            foreach (JogadorDto x in temp)
            {
                if (!pair.Second.Contains(x))
                {
                    pair.Second.Add(x);
                }
            }

            await recursive(pair, nivel - 1);
        }


        [HttpDelete("{id}/hard")]
        public async Task<ActionResult<JogadorDto>> HardDelete(Guid id)
        {
            try
            {
                var fam = await _service.DeleteAsync(new JogadorId(id));

                if (fam == null)
                {
                    return NotFound();
                }

                return (fam);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }

        [HttpGet("autenticar/{email}/{password}")]
        public async Task<ActionResult<JogadorDto>> autenticar(String email, String password)
        {
            Task<JogadorDto> jog = _service.getJogadorByEmail(email);
            //if(jog.Result.Password._Password.Equals(password)){}
            return await jog;
        }

        [HttpGet("emails/{emails}")]
        public async Task<ActionResult<String>> obterEmails(String emails)
        {
            List<JogadorDto> list = await _service.GetAllAsync();
            String final = "";
            String[] strings = emails.Split(",");
            foreach (var VARIABLE in strings)
            {
                String email = "";
                foreach (var jogador in list)
                {
                    if (VARIABLE.Equals(jogador.Id.ToString()))
                    {
                        email = jogador.Email;
                        break;
                    }
                }

                final = final + "," + email;
            }

            //if(jog.Result.Password._Password.Equals(password)){}
            return final;
        }


        [HttpGet("leaderBoard/{flag}")]
        public async Task<ActionResult<List<JogadorLeaderBoardDto>>> leaderBoard(string flag)
        {
            var response = new List<JogadorLeaderBoardDto>();
            relacaoDtos = await _serviceRelacoes.GetAllAsync();
            jogadorDtos = await _service.GetAllAsync();


            foreach (var jogador in jogadorDtos)
            {
                List<JogadorDto> active = new List<JogadorDto>();
                List<RelacaoDto> final = new List<RelacaoDto>();

                auxiliar(10, active, jogador, null, final);
                if (flag.Equals("dimensao"))
                {
                    response.Add(new JogadorLeaderBoardDto()
                        {nome = jogador.Nome, email = jogador.Email, valor = active.Count});
                }
                else
                {
                    int nr = 0;
                    foreach (var VARIABLE in final)
                    {
                        nr += VARIABLE.ForcaLigacao;
                    }

                    response.Add(new JogadorLeaderBoardDto() {nome = jogador.Nome, email = jogador.Email, valor = nr});
                }
            }

            List<JogadorLeaderBoardDto> SortedList = response.OrderByDescending(o => o.valor).ToList();

            return SortedList;
        }

        [HttpGet("grafoComum/usr1={user1}&usr2={user2}")]
        public async Task<ActionResult<List<String>>> grafoAmigoComum(string user1, string user2)
        {
            var relacoes1 = await _serviceRelacoes.getRelacoes(new JogadorId(user1));
            var relacoes2 = await _serviceRelacoes.getRelacoes(new JogadorId(user2));

            List<Pair<string, RelacaoDto>> auxiliar = new List<Pair<string, RelacaoDto>>();
            List<Pair<string, RelacaoDto>> auxiliar2 = new List<Pair<string, RelacaoDto>>();
            List<string> final = new List<string>();
            foreach (var VARIABLE in relacoes1)
            {
                if (VARIABLE.JogadorA.Equals(user1))
                {
                    auxiliar.Add(new Pair<string, RelacaoDto>(VARIABLE.JogadorB, VARIABLE));
                }
                else
                {
                    auxiliar.Add(new Pair<string, RelacaoDto>(VARIABLE.JogadorA, VARIABLE));
                }
            }

            foreach (var VARIABLE in relacoes2)
            {
                if (VARIABLE.JogadorA.Equals(user2))
                {
                    auxiliar2.Add(new Pair<string, RelacaoDto>(VARIABLE.JogadorB, VARIABLE));
                }
                else
                {
                    auxiliar2.Add(new Pair<string, RelacaoDto>(VARIABLE.JogadorA, VARIABLE));
                }
            }

            foreach (var VARIABLE in auxiliar)
            {
                foreach (var VARIABLE2 in auxiliar2)
                {
                    if (VARIABLE.First.Equals(VARIABLE2.First))
                    {
                        final.Add((await _service.GetByIdAsync(new JogadorId(VARIABLE.Second.JogadorA))).Email + "," +
                                  (await _service.GetByIdAsync(new JogadorId(VARIABLE.Second.JogadorB))).Email);
                        final.Add((await _service.GetByIdAsync(new JogadorId(VARIABLE2.Second.JogadorA))).Email + "," +
                                  (await _service.GetByIdAsync(new JogadorId(VARIABLE2.Second.JogadorB))).Email);
                    }
                }
                if (VARIABLE.Second.JogadorA.Equals(user1) && VARIABLE.Second.JogadorB.Equals(user2) || VARIABLE.Second.JogadorB.Equals(user1) && VARIABLE.Second.JogadorA.Equals(user2))
                {
                    final.Add((await _service.GetByIdAsync(new JogadorId(VARIABLE.Second.JogadorA))).Email + "," +
                              (await _service.GetByIdAsync(new JogadorId(VARIABLE.Second.JogadorB))).Email);
                }
            }

            foreach (var VARIABLE2 in auxiliar2)
            {
                if (VARIABLE2.Second.JogadorA.Equals(user1) && VARIABLE2.Second.JogadorB.Equals(user2) || VARIABLE2.Second.JogadorB.Equals(user1) && VARIABLE2.Second.JogadorA.Equals(user2))
                {
                    if(!final.Contains((await _service.GetByIdAsync(new JogadorId(VARIABLE2.Second.JogadorA))).Email + "," +
                                      (await _service.GetByIdAsync(new JogadorId(VARIABLE2.Second.JogadorB))).Email) && !final.Contains((await _service.GetByIdAsync(new JogadorId(VARIABLE2.Second.JogadorB))).Email + "," +
                        (await _service.GetByIdAsync(new JogadorId(VARIABLE2.Second.JogadorA))).Email))
                    final.Add((await _service.GetByIdAsync(new JogadorId(VARIABLE2.Second.JogadorA))).Email + "," +
                              (await _service.GetByIdAsync(new JogadorId(VARIABLE2.Second.JogadorB))).Email);
                }
            }

            return final;
        }
        
        [HttpGet("getForcaCaminho/{caminho}")]
        public async Task<ActionResult<String>> GetForcaCaminho(String caminho)
        {
            String[] var1 = caminho.Split(",");
            List<String> var = new List<String>();
            foreach (var VARIABLE in var1)
            {
                if(VARIABLE!="")
                    var.Add((await _service.getJogadorByEmail(VARIABLE)).Id.ToString());
            }
            
            var relacoes = await _serviceRelacoes.GetAllAsync();
            int nr=0;

            for (int i = 0; i < var.Count - 1; i++)
            { 
                foreach (var relacao in relacoes)
                {
                    if ((var[i].Equals(relacao.JogadorA) && var[i + 1].Equals(relacao.JogadorB)) ||
                        (var[i].Equals(relacao.JogadorB) && var[i + 1].Equals(relacao.JogadorA)))
                    {
                        nr += relacao.ForcaLigacao;
                        break;
                    }
                }
            }

            return nr+"";
        }



        [HttpGet("relacoesNivel/{id}/{nivel}")]
        public async Task<ActionResult< List<RelacaoNivelDto>>> getRelacoesNivel(String id,int nivel)
        {
            listaNiveis = new List<int>();
            List<RelacaoNivelDto> lista = new List<RelacaoNivelDto>();
            JogadorDto inicial = await _service.GetByIdAsync(new JogadorId(id));
            relacaoDtos = await _serviceRelacoes.GetAllAsync();
            jogadorDtos = await _service.GetAllAsync();
            List<JogadorDto> active = new List<JogadorDto>();
            List<RelacaoDto> final = new List<RelacaoDto>();
            auxiliar(nivel, active, inicial, null, final);
            int i = 0;
            
            foreach (var VARIABLE in final)
            {
                lista.Add(new RelacaoNivelDto(){value = VARIABLE,key=Math.Abs(listaNiveis[i]-nivel)});
                i++;
            }

            return lista;
        }
        
        [HttpGet("ligacoesSegundoN/{id}")]
        public async Task<ActionResult<String>> getLigacoesSegundoN(String id)
        {
            JogadorDto inicial = await _service.GetByIdAsync(new JogadorId(id));
            relacaoDtos = await _serviceRelacoes.GetAllAsync();
            jogadorDtos = await _service.GetAllAsync();
            List<JogadorDto> active = new List<JogadorDto>();
            List<RelacaoDto> final = new List<RelacaoDto>();
            auxiliar(nivel: 3, active, inicial, null, final);
            return final.Count+"";
        }
        
        
    }
}