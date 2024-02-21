using System;

namespace DDDSample1.Domain.Introducoes
{
    public class IntroducaoDto
    {
        public Guid Id { get;  set; }
        
        public string MensagemIntroducaoIntermedio{ get;  set; }
        
        public string MensagemIntroducaoObjetivo{ get;  set; }

        public string JogadorInicio{ get;  set; }

        public string JogadorIntermedio{ get;  set; }

        public string JogadorObjetivo{ get; set; }
        
    }
}