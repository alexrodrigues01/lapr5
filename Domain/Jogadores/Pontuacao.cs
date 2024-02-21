using DDDSample1.Domain.Shared;
using Microsoft.EntityFrameworkCore;

namespace DDDSample1.Domain.Jogadores
{
    [Owned]
    public class Pontuacao : IValueObject
    {
        public int _Pontuacao { get; private set; }
        
        private Pontuacao(){}

        public Pontuacao(int pontuacao)
        {
            if (pontuacao < 0) throw new BusinessRuleValidationException("Pontuação tem que ser maior que 0");
            this._Pontuacao = pontuacao;
        }
    }
}