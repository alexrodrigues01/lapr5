using System;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.EstadosHumor
{
    public class EstadoHumorDto
    {
        public Guid Id { get;  set; }
        public string Estado { get;   set; }
        public string DataEstadoHumor{ get;   set; }
        
            
    }
}