using DDDSample1.Domain.Shared;
using Microsoft.EntityFrameworkCore;

namespace DDDSample1.Domain.Relacoes
{
    [Owned]
    public class ForcaLigacao : IValueObject
    {
        public int _ForcaLigacao { get; private set; }

        private ForcaLigacao(){}

        public ForcaLigacao(int forcaLigacao)
        {
            if (forcaLigacao<=100 && forcaLigacao>0)
            {
                this._ForcaLigacao = forcaLigacao;
            }
            else
            {
                throw new BusinessRuleValidationException("A força de ligação tem de estar entre 1 e 100");
            }
            
        }
    }
}