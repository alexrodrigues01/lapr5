using System;
using DDDSample1.Domain.Shared;
using Microsoft.EntityFrameworkCore;

namespace DDDSample1.Domain.Jogadores
{
    [Owned]
    public class Password : IValueObject
    
    {
        public string _Password { get; private set; }
        
        private Password(){}

        public Password(string password)
        {
            if (String.IsNullOrEmpty(password)) throw new BusinessRuleValidationException("Precisa de introduzir a password");


            this._Password = password;
        }
    }
}