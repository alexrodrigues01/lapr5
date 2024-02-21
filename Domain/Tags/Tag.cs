using System;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Tags
{
    
    public class Tag: Entity<TagId>, IAggregateRoot
    {
        public Descricao Descricao { get; private set; }
        
        public bool Active { get; private set; }
        private Tag()
        {
            this.Active = true;
        }


        public Tag(string Descricao)
        {
            this.Id = new TagId(Guid.NewGuid());
            this.Descricao = new Descricao(Descricao);
        }
        
        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
    
    
    
    
}