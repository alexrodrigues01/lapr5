using System;

namespace DDDSample1.Domain.Introducoes
{
    public class CreatingIntroducaoDto
    {
        public string MensagemIntroducaoIntermedio{ get; private set; }
        
        public string MensagemIntroducaoObjetivo{ get; private set; }

        public string JogadorInicio{ get; private set; }

        public string JogadorIntermedio{ get; private set; }

        public string JogadorObjetivo{ get; private set; }

        public CreatingIntroducaoDto(string mensagemIntroducaoIntermedio, string mensagemIntroducaoObjetivo, string jogadorInicio, string jogadorIntermedio, string jogadorObjetivo)
        {
            MensagemIntroducaoIntermedio = mensagemIntroducaoIntermedio;
            MensagemIntroducaoObjetivo = mensagemIntroducaoObjetivo;
            JogadorInicio = jogadorInicio;
            JogadorIntermedio = jogadorIntermedio;
            JogadorObjetivo = jogadorObjetivo;
        }
    }
}