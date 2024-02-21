using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DDDSample1.Domain.PedidosLigacao;

namespace DDDSample1.Domain.Introducoes
{
    public interface IIntroducaoService
    {
        public Task<List<IntroducaoDto>> GetAllAsync();

        public Task<IntroducaoDto> AddAsync(CreatingIntroducaoDto dto);

        public Task<IntroducaoDto> GetByIdAsync(IntroducaoId id);

        public Task<List<IntroducaoDto>> GetIntroducoesByUser(String Userid);

        public Task<PedidoLigacaoDto> DeleteAsync(IntroducaoId id, string flag);
    }
}