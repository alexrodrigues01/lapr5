using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using DDDNetcore.Domain.Relacoes;
using DDDNetCore.Domain.Tags;
using DDDSample1.Domain.EstadosHumor;
using DDDSample1.Domain.Jogadores;


namespace DDDSample1.ALGAV
{
    public class HttpProlog: IIA
    
    {
        private const string UTILIZADOR_QUERY = "/utilizador?i={0}&n={1}&t={2}";
        private const string UTILIZADOR_ESTADO_QUERY = "/utilizadorEstado?i={0}&n={1}&t={2}&estado={3}&valor={4}";
        private const string RELACIONAMENTO_QUERY = "/relacao?i={0}&i1={1}&i2={2}&f1={3}&f2={4}";
        private readonly HttpClient _client;
        private readonly string _url;
        private readonly ITagService _tagService;
        private readonly IEstadoHumorService _estadoHumorService;

        public HttpProlog(ITagService _tagService,IEstadoHumorService _estadoHumorService)
        {
            this._tagService = _tagService;
            this._estadoHumorService = _estadoHumorService;
            _url = "https://vs-gate.dei.isep.ipp.pt:30811";
            _client = new HttpClient();
        }
        public async Task<string> boot(List<JogadorDto> utilizadores, List<RelacaoDto> relacionamentos)
        {
            StringBuilder sb = new StringBuilder();
            

            sb.Append("Inicializar base de conhecimento da IA:\n");
            foreach (var utilizadorDto in utilizadores)
            {
                sb.Append(utilizadorDto.Id).Append(": ");
                string resposta = await adicionarUtilizador(utilizadorDto);
                sb.Append(resposta).Append("\n");
                resposta = await adicionarUtilizadorEstado(utilizadorDto);
                sb.Append(resposta).Append("\n");
            }

            sb.Append("\n");
            foreach (var relacionamentoDto in relacionamentos)
            {
                sb.Append(relacionamentoDto.Id).Append(": ");
                string resposta = await adicionarRelacionamento(relacionamentoDto);
                sb.Append(resposta).Append("\n");
            }

            return sb.ToString();
        }

        public async Task<string> adicionarUtilizador(JogadorDto dto)
        {
            var relacoes = new List<string>();
            foreach (var interest in dto.InterestTags)
            {
                relacoes.Add(_tagService.getTagsByID(interest.tagid).Result.Descricao);
            }
            StringBuilder stringBuilder = new StringBuilder();
            int tamanho = relacoes.Count;
            foreach (var tag in relacoes)
            {
                if (relacoes.IndexOf(tag) == tamanho-1)
                {
                    stringBuilder.Append(tag);
                }
                else
                {
                    stringBuilder.Append(tag + ",");
                }
            }
            
            return await _client.GetStringAsync(_url + String.Format(UTILIZADOR_QUERY, dto.Id, dto.Nome, stringBuilder.ToString()));
        }
        
        public async Task<string> adicionarUtilizadorEstado(JogadorDto dto)
        {
            var relacoes = new List<string>();
            foreach (var interest in dto.InterestTags)
            {
                relacoes.Add(_tagService.getTagsByID(interest.tagid).Result.Descricao);
            }
            StringBuilder stringBuilder = new StringBuilder();
            int tamanho = relacoes.Count;
            foreach (var tag in relacoes)
            {
                if (relacoes.IndexOf(tag) == tamanho-1)
                {
                    stringBuilder.Append(tag);
                }
                else
                {
                    stringBuilder.Append(tag + ",");
                }
            }
            
            List<string> array=new List<string>();
            array.Add("Joyful");
            array.Add(" Distressed");
            array.Add("Hopeful");
            array.Add("Fearful");
            array.Add("Relieve");
            array.Add(" Disappointed");
            array.Add("Proud");
            array.Add("Remorseful");
            array.Add("Grateful");
            array.Add("Angry");
            
            var estadoDto =await _estadoHumorService.GetByIdAsync(new EstadoHumorId(dto.EstadoHumor));
            Random random = new Random();
            var n = random.NextDouble();
            int index = array.IndexOf(estadoDto.Estado);
            string s = String.Format(UTILIZADOR_ESTADO_QUERY, dto.Id, dto.Nome, stringBuilder.ToString(), index, "0.1");
            return await _client.GetStringAsync(_url + String.Format(UTILIZADOR_ESTADO_QUERY, dto.Id, dto.Nome, stringBuilder.ToString(),index,50));
        }

        public async Task<string> adicionarRelacionamento(RelacaoDto dto)
        {
            return await _client.GetStringAsync(_url + String.Format(RELACIONAMENTO_QUERY, dto.Id.ToString(),
                dto.JogadorA.ToString(), dto.JogadorB.ToString(), dto.ForcaLigacao, dto.ForcaRelacao));
        }

        public async Task<string> URL()
        {
            return _url;
        }
        
        
    }
}