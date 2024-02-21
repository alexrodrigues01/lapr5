using DDDSample1.Domain.Shared;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using System;

namespace DDDSample1.Domain.Jogadores
{
    [Owned]
    public class Nome : IValueObject
    { 
            public string _Nome { get; private set; }
        
            private Nome(){}

            public Nome(string nome)
            {
                if (String.IsNullOrEmpty(nome)) throw new BusinessRuleValidationException("Precisa de introduzir o nome");

               
                this._Nome = nome;
            }
    }
}