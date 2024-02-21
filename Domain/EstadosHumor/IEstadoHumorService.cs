using System.Collections.Generic;
using System.Threading.Tasks;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.EstadosHumor
{
    public interface IEstadoHumorService
    {

        public Task<EstadoHumorDto> GetByIdAsync(EstadoHumorId estadoHumorId);
        
        public  Task<List<EstadoHumorDto>> GetAllAsync();

        public Task<EstadoHumorDto> UpdateAsync(EstadoHumorDto dto);

        public  Task<EstadoHumorDto> AddAsync(CreatingEstadoHumorDto dto);

        public Task<EstadoHumorDto> DeleteAsync(EstadoHumorId id);

    }
}