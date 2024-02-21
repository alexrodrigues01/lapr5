using DDDSample1.Domain.Shared;
using Microsoft.EntityFrameworkCore;

namespace DDDSample1.Domain.Jogadores
{
    [Owned]
    public class FacebookPerfil : IValueObject
    {
        public string _FacebookPerfil { get; private set; }
        
        private FacebookPerfil(){}

        public FacebookPerfil(string facebookPerfil)
        {
            if (string.IsNullOrEmpty(facebookPerfil))
                throw new BusinessRuleValidationException("Link do perfil de Facebook tem de ser preenchido");
            this._FacebookPerfil = facebookPerfil;
        }
    }
}