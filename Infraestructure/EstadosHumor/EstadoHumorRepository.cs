using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DDDSample1.Controllers;
using DDDSample1.Domain.EstadosHumor;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.Tags;
using DDDSample1.Infrastructure.Shared;

namespace DDDSample1.Infrastructure.EstadosHumor
{
    public class EstadoHumorRepository : BaseRepository<EstadoHumor,EstadoHumorId>, IEstadoHumorRepository
    {
        public EstadoHumorRepository(DDDSample1DbContext context):base(context.EstadosHumor)
        {
           
        }
    }
}