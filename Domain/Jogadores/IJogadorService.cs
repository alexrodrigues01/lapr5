using System.Collections.Generic;
using System.Threading.Tasks;

namespace DDDSample1.Domain.Jogadores
{
    public interface IJogadorService
    {
        public Task<List<JogadorDto>> GetAllAsync();

        public Task<JogadorDto> GetByIdAsync(JogadorId id);

        public Task<JogadorDto> AddAsync(CreatingJogadorDto dto);
        
        public Task<JogadorDto> UpdateAsync(PutJogadorDto dto);
        
        public Task<JogadorDto> getJogadorByTelemovel(string telemovel);

        public Task<JogadorDto> getJogadorByEmail(string email);
        
        public Task<JogadorDto> getJogadorByNome(string nome);
        
        public Task<List<JogadorDto>> getJogadoresByPais(string pais);
        
        public Task<List<JogadorDto>> getJogadoresByTag(string tagString);

        public Task<List<JogadorDto>> getJogadoresObjetivo(string id);

        public Task<JogadorDto> DeleteAsync(JogadorId id);
 
    }
}