using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.PedidosLigacao;
using Xunit;

namespace DDDSample1.TestesUnitariosDomain.PedidosLigacao
{
    public class PedidoLigacaoTest
    {
        [Fact]
        public void PedidoLigacaoConstructorTest()
        {
            JogadorId expectedJogadorInicio = new JogadorId("00000000-0000-0000-0000-000000000000");
            JogadorId expectedJogadorObjetivo = new JogadorId("00000000-0000-0000-0000-000000000001");

            PedidoLigacao pedidoLigacao = new PedidoLigacao(expectedJogadorInicio, expectedJogadorObjetivo);
            
            Assert.NotNull(pedidoLigacao);
            Assert.Equal(expectedJogadorInicio,pedidoLigacao.jogadorInicio);
            Assert.Equal(expectedJogadorObjetivo,pedidoLigacao.jogadorObjetivo);
        }
    }
}