using DDDSample1.Domain.Jogadores;

namespace DDDNetcore.Domain.Relacoes
{
    public class CreatingRelacaoDto
    {
        public JogadorId JogadorA { get; set; }
        
        public JogadorId JogadorB { get; set; }
        
        public string TagsRelacao { get;  set; }
        
        public int ForcaLigacao { get;  set; }
        
        public int ForcaRelacao { get;  set; }
        
        public string DataRelacao { get;  set; }
        
        public CreatingRelacaoDto(/*string jogadorA, string jogadorB,*/ string tagsRelacao, int forcaLigacao, string dataRelacao)
        {
            /*this.JogadorA = new JogadorId(jogadorA);
            this.JogadorB = new JogadorId(jogadorB);*/
            this.TagsRelacao = tagsRelacao;
            this.ForcaLigacao = forcaLigacao;
            this.DataRelacao = dataRelacao;
        }
        
        
    }
}