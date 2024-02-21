using DDDSample1.Domain.Shared;
using Microsoft.EntityFrameworkCore;

namespace DDDSample1.Domain.Relacoes
{
    [Owned]
    public class ForcaRelacao : IValueObject
    {
        public int _ForcaRelacao { get; private set; }

        private ForcaRelacao(){}

        public ForcaRelacao(int forcaRelacao)
        {
            this._ForcaRelacao = forcaRelacao;
        }
    }
}