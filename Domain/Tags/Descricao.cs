using DDDSample1.Domain.Shared;
using Microsoft.EntityFrameworkCore;

namespace DDDSample1.Domain.Tags
{
    [Owned]
    public class Descricao: IValueObject
    { 
        public string _Descricao { get; private set; }
        
        private Descricao(){}

        public Descricao(string descricao)
        {
            // if (string.IsNullOrEmpty(descricao)) throw new BusinessRuleValidationException("Precisa de introduzir a descricao da tag");

               
            this._Descricao = descricao;
        }
    }
    
}