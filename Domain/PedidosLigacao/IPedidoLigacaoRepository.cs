using System.Collections.Generic;
using System.Threading.Tasks;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.PedidosLigacao
{
    public interface IPedidoLigacaoRepository : IRepository<PedidoLigacao, PedidoLigacaoId>
    {
        public Task<List<PedidoLigacao>> getPedidosLigacaoPendentes(JogadorId idjogador);
    }
}