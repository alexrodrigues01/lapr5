using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DDDNetcore.Domain.Relacoes;

namespace DDDSample1.Domain.PedidosLigacao
{
    public interface IPedidoLigacaoService
    {
        public Task<List<PedidoLigacaoDto>> GetAllAsync();
        public Task<PedidoLigacaoDto> GetByIdAsync(PedidoLigacaoId id);
        public Task<PedidoLigacaoDto> AddAsync(CreatingPedidoLigacaoDto dto);
        public Task<List<PedidoLigacaoDto>> AddAsync(Guid jogadorId, String jogadoresId);
        public Task<PedidoLigacaoDto> UpdateAsync(PedidoLigacaoDto dto);
        public Task<PedidoLigacaoDto> InactivateAsync(PedidoLigacaoId id);
        public Task<RelacaoDto> DeleteAsync(PedidoLigacaoId id, string flag, CreatingRelacaoDto dto);
        public Task<PedidoLigacaoDto> DeleteAsync(PedidoLigacaoId id);
        public Task<List<PedidoLigacaoDto2>> getPedidosLigacaoPendentes(string idjogador);
    }
}