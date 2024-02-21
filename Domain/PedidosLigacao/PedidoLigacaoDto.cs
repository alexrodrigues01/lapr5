using DDDSample1.Domain.Jogadores;

namespace DDDSample1.Domain.PedidosLigacao
{
    public class PedidoLigacaoDto
    {
        public PedidoLigacaoId Id { get; set; }
        
        public JogadorId jogadorInicio { get; set; }
        
        public JogadorId jogadorObjetivo { get; set; }
    }
}