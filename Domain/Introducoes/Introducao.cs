using System;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Introducoes
{
    
    public class Introducao: Entity<IntroducaoId>, IAggregateRoot
    {
        public MensagemIntroducao MensagemIntroducaoIntermedio{ get; private set; }
        
        public MensagemIntroducao MensagemIntroducaoObjetivo{ get; private set; }

        public JogadorId JogadorInicio{ get; private set; }

        public JogadorId JogadorIntermedio{ get; private set; }

        public JogadorId JogadorObjetivo{ get; private set; }

        public bool Active{ get;  private set; }
        
        private Introducao()
        {
            this.Active = true;
        }
        
        public Introducao(string MensagemIntroducaoIntermedio,string MensagemIntroducaoObjetivo,string JogadorInicio,string JogadorIntermedio,string JogadorObjetivo)
        {
            this.Id = new IntroducaoId(Guid.NewGuid());
            this.MensagemIntroducaoIntermedio = new MensagemIntroducao(MensagemIntroducaoIntermedio);
            this.MensagemIntroducaoObjetivo = new MensagemIntroducao(MensagemIntroducaoObjetivo);
            this.JogadorInicio = new JogadorId(JogadorInicio);
            this.JogadorIntermedio = new JogadorId(JogadorIntermedio);
            this.JogadorObjetivo = new JogadorId(JogadorObjetivo);
        }
        
        
    }
}