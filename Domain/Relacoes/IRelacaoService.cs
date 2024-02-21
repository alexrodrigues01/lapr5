using System.Collections.Generic;
using System.Threading.Tasks;
using DDDNetcore.Domain.Relacoes;
using DDDSample1.Domain.Jogadores;

namespace DDDNetCore.Domain.Relacoes
{
    public interface IRelacaoService
    {
        public Task<List<RelacaoDto>> GetAllAsync();

        public Task<RelacaoDto> GetByIdAsync(RelacaoId id);

        public Task<RelacaoDto> UpdateAsync(RelacaoDto dto);

        public Task<List<RelacaoDto>> getRelacoes(JogadorId jogadorId);
        
        
        public Task<RelacaoDto> DeleteAsync(RelacaoId id);
        
        

    }
}