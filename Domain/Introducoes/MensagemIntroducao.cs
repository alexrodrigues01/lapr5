using System.ComponentModel.DataAnnotations.Schema;
using DDDSample1.Domain.Shared;
using Microsoft.EntityFrameworkCore;

namespace DDDSample1.Domain.Introducoes
{
    [Owned]
    public class MensagemIntroducao : IValueObject
    {
        public string _MensagemIntroducao;
        
        private MensagemIntroducao(){}

        public MensagemIntroducao(string mensagemIntroducao)
        {
            _MensagemIntroducao = mensagemIntroducao;
        }
    }
}