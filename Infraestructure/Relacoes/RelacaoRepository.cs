using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DDDNetcore.Domain.Relacoes;
using DDDNetCore.Domain.Relacoes;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Infrastructure;
using DDDSample1.Infrastructure.Shared;
using Microsoft.EntityFrameworkCore;

namespace DDDNetcore.Infraestructure.Relacoes
{
    public class RelacaoRepository : BaseRepository<Relacao,RelacaoId>, IRelacaoRepository
    {
        public RelacaoRepository(DDDSample1DbContext context) : base(context.Relacoes)
        {
            
        }

        public Task<List<Relacao>> getRelacoes(JogadorId jogadorId)
        {
            return getContext().Where(relacao => relacao.JogadorA.Equals(jogadorId) || relacao.JogadorB.Equals(jogadorId)).ToListAsync();
        }
    }
}