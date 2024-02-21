using System.Collections.Generic;
using System.Threading.Tasks;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.EstadosHumor
{
    public class EstadoHumorService : IEstadoHumorService
    {
        private readonly IEstadoHumorRepository _repo;
        private readonly IUnitOfWork _unitOfWork;
        
        public EstadoHumorService(IUnitOfWork unitOfWork, IEstadoHumorRepository repo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
        }

        public async Task<EstadoHumorDto> GetByIdAsync(EstadoHumorId estadoHumorId)
        {
            var estado = await this._repo.GetByIdAsync(estadoHumorId); 
            if (estado == null)
                return null;
            return new EstadoHumorDto(){ Id = estado.Id.AsGuid(),Estado = estado.Estado.ToString(),DataEstadoHumor = estado.DataEstadoHumor._DataEstadoHumor.ToString() };
        }

        public async Task<List<EstadoHumorDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();
            
            List<EstadoHumorDto> listDto = list.ConvertAll<EstadoHumorDto>(cat => new EstadoHumorDto(){Id = cat.Id.AsGuid(),DataEstadoHumor = cat.DataEstadoHumor._DataEstadoHumor.ToString(),Estado = cat.Estado.ToString()});

            return listDto;
        }
        
        public async Task<EstadoHumorDto> UpdateAsync(EstadoHumorDto dto)
        {
            var estado = await this._repo.GetByIdAsync(new EstadoHumorId(dto.Id)); 

            if (estado == null)
                return null;   

            // change all field
            estado.changeEstadoHumor(dto.Estado);
            estado.changeData(dto.DataEstadoHumor);
            
            await this._unitOfWork.CommitAsync();
            
            return new EstadoHumorDto(){ Id = estado.Id.AsGuid(),Estado = estado.Estado.ToString(),DataEstadoHumor = estado.DataEstadoHumor._DataEstadoHumor.ToString() };
        }
        
        public async Task<EstadoHumorDto> AddAsync(CreatingEstadoHumorDto dto)
        {
            var estado = new EstadoHumor(dto.Estado,dto.DataEstado);

            await this._repo.AddAsync(estado);

            await this._unitOfWork.CommitAsync();

            return new EstadoHumorDto() { Id = estado.Id.AsGuid(), Estado = estado.Estado.ToString(),DataEstadoHumor = estado.DataEstadoHumor._DataEstadoHumor.ToString()};
        }
        
        public async Task<EstadoHumorDto> DeleteAsync(EstadoHumorId id)
        {
            var estado = await this._repo.GetByIdAsync(id); 

            if (estado == null)
                return null;   
            
            this._repo.Remove(estado);
            await this._unitOfWork.CommitAsync();

            return new EstadoHumorDto() {  Id = estado.Id.AsGuid(), Estado = estado.Estado.ToString(),DataEstadoHumor = estado.DataEstadoHumor._DataEstadoHumor.ToString()};
        }
        
    }
}