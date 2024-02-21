

using System;
using System.ComponentModel.DataAnnotations;
using DDDSample1.Domain.EstadosHumor;
using DDDSample1.Domain.Products;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.EstadosHumor
{
    public enum EstadosHumor
    {   
        Joyful,
        Distressed,
        Hopeful,
        Fearful,
        Relieve,
        Disappointed,
        Proud,
        Remorseful,
        Grateful,
        Angry
    }
    
    
    public class EstadoHumor : Entity<EstadoHumorId>, IAggregateRoot {
        
        public EstadosHumor Estado { get;  private set; }
        
        [DataType(DataType.Date)]
        public DataEstadoHumor DataEstadoHumor{ get;  private set; }
        public bool Active{ get;  private set; }

        private EstadoHumor()
        {
            this.Active = true;
        }
        
        public EstadoHumor(string estado,string dataEstadoHumor)
        {
            
            this.Id = new EstadoHumorId(Guid.NewGuid());
            this.Estado =(EstadosHumor) EstadosHumor.Parse(typeof(EstadosHumor),estado,true);
            
            this.DataEstadoHumor = new DataEstadoHumor(dataEstadoHumor);
            this.Active = true;
        }
        

        public void changeEstadoHumor(string estado)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the estado humor to an inactive family.");
            this.Estado =(EstadosHumor) EstadosHumor.Parse(typeof(EstadosHumor),estado,true);
        }
        
        public void changeData(string data)
        {
            this.DataEstadoHumor = new DataEstadoHumor(data);
        }
    }
    
}