using DDDSample1.Domain.Jogadores;

namespace DDDSample1.Domain.PedidosLigacao
{
    public class CreatingPedidoLigacaoDto
    {
        public string jogadorInicio{ get; set; }
        
        public string jogadorObjetivo{ get; set; }

        public CreatingPedidoLigacaoDto(string jogadorInicio, string jogadorObjetivo)
        {
            this.jogadorInicio = jogadorInicio;
            this.jogadorObjetivo = jogadorObjetivo;
        }
    }
}