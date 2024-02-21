using System;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.PedidosLigacao
{
    public class PedidoLigacao : Entity<PedidoLigacaoId>, IAggregateRoot
    {

        public JogadorId jogadorInicio { get; set; }
        
        public JogadorId jogadorObjetivo { get; set; }

        public PedidoLigacao(JogadorId jogadorInicio, JogadorId jogadorObjetivo)
        {
            this.Id = new PedidoLigacaoId(Guid.NewGuid());
            this.jogadorInicio = jogadorInicio;
            this.jogadorObjetivo = jogadorObjetivo;
        }
    }
}