using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.PedidosLigacao;
using DDDSample1.Infrastructure.Shared;
using Microsoft.EntityFrameworkCore;

namespace DDDSample1.Infrastructure.PedidosLigacao
{
    public class PedidoLigacaoRepository : BaseRepository<PedidoLigacao, PedidoLigacaoId>, IPedidoLigacaoRepository
    {
        public PedidoLigacaoRepository(DDDSample1DbContext context):base(context.PedidosLigacao)
        {
        }

        public Task<List<PedidoLigacao>> getPedidosLigacaoPendentes(JogadorId idjogador)
        {
            return getContext().Where(pedo => pedo.jogadorObjetivo.Equals(idjogador)).ToListAsync();
        }
    }
}