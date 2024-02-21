using DDDSample1.Domain.Tags;
using DDDSample1.Domain.Relacoes;
using DDDSample1.Domain.Shared;
using System;
using System.Collections.Generic;
using DDDSample1.Domain.Jogadores;

namespace DDDNetcore.Domain.Relacoes
{
    public class Relacao : Entity<RelacaoId>, IAggregateRoot
    {
        public JogadorId JogadorA { get;  private set; }
        public JogadorId JogadorB { get;  private set; }
        
        public List<TagidString> TagsRelacao { get; private set; }
        
        public ForcaLigacao ForcaLigacao { get;  private set; }
        
        public ForcaRelacao ForcaRelacao { get;  private set; }
        
        public DataRelacao DataRelacao { get;  private set; }
        
        public bool Active{ get;  private set; }

        private Relacao()
        {
            this.Active = true;
        }

        public Relacao(JogadorId jogadorA, JogadorId jogadorB, List<TagidString> tagsRelacao, int forcaLigacao, string dataRelacao)
        {
            this.Id = new RelacaoId(Guid.NewGuid());
            this.JogadorA = jogadorA;
            this.JogadorB = jogadorB;
            this.TagsRelacao = tagsRelacao;
            this.ForcaLigacao = new ForcaLigacao(forcaLigacao);
            this.DataRelacao = new DataRelacao(dataRelacao);
            this.Active = true;
        }
        
        public void ChangeForcaLigacao(int forcaLigacao)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("Não é possível alterar a força de ligação de uma relação inativa");
            this.ForcaLigacao = new ForcaLigacao(forcaLigacao);
        }
        
        public void ChangeForcaRelacao(int forcaRelacao )
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("Não é possível alterar a força de ligação de uma relação inativa");
            this.ForcaRelacao = new ForcaRelacao(forcaRelacao);
        }

        public void ChangeTags(List<TagidString> tags)
        {
            if(!this.Active) 
                throw new BusinessRuleValidationException("Não é possível alterar as tags de uma relação inativa");
            this.TagsRelacao = tags;
        }
        
        /*public void MarkAsInative()
        {
            this.Active = false;
        }*/
    }
}