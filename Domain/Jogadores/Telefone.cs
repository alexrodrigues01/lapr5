using DDDSample1.Domain.Shared;
using Microsoft.EntityFrameworkCore;
using System;

namespace DDDSample1.Domain.Jogadores
{
    [Owned]
    public class Telefone : IValueObject
    {
        public string _Telefone { get; private set; }
        
        private Telefone(){}

        public Telefone(string telefone)
        {
            if (String.IsNullOrEmpty(telefone))
                throw new BusinessRuleValidationException("Precisa de introduzir o nome");
            if (Convert.ToDouble(telefone) < 100000000 || Convert.ToDouble(telefone) > 999999999)
                throw new BusinessRuleValidationException("Formato de telefone inválido");
            this._Telefone = telefone;
        }
    }
}