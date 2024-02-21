using System.Collections.Generic;
using System.Threading.Tasks;
using DDDNetcore.Domain.Relacoes;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.Shared;

namespace DDDNetCore.Domain.Relacoes
{
    public interface IRelacaoRepository : IRepository<Relacao,RelacaoId>
    {
        public Task<List<Relacao>> getRelacoes(JogadorId jogadorId);
    }
}