using DDDSample1.Domain.Shared;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using System;

namespace DDDSample1.Domain.Jogadores
{
    [Owned]
    public class Email : IValueObject
    {
        public string _Email { get; private set; }
        
        private Email(){}

        public Email(string email)
        {
            if (String.IsNullOrEmpty(email)) throw new BusinessRuleValidationException("Precisa de introduzir o email");

            var emailValidator = new EmailAddressAttribute();
            if (!emailValidator.IsValid(email))
            {
                throw new BusinessRuleValidationException($"Invalid format for email (email) ", nameof(email));
            }
            this._Email = email;
        }
    }
}