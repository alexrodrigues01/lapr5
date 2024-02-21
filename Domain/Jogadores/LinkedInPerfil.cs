using DDDSample1.Domain.Shared;
using Microsoft.EntityFrameworkCore;

namespace DDDSample1.Domain.Jogadores
{
    [Owned]
    public class LinkedInPerfil : IValueObject
    {
        public string _LinkedInPerfil { get; private set; }
        
        private LinkedInPerfil(){}

        public LinkedInPerfil(string linkedInPerfil)
        {
            if (string.IsNullOrEmpty(linkedInPerfil))
                throw new BusinessRuleValidationException("Link do perfil de linkedin tem de ser preenchido");
            this._LinkedInPerfil = linkedInPerfil;
        }
    }
}