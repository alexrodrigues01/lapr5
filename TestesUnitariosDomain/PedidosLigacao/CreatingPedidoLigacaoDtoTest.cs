using DDDSample1.Domain.PedidosLigacao;
using Xunit;

namespace DDDSample1.TestesUnitariosDomain.PedidosLigacao
{
    public class CreatingPedidoLigacaoDtoTest
    {
        [Fact]
        public void CreatingPedidoLigacaoConstructorDtoTest()
        {
            string expectedJogadorInicio = "00000000-0000-0000-0000-000000000000";
            string expectedJogadorObjetivo = "00000000-0000-0000-0000-000000000001";

            CreatingPedidoLigacaoDto dto = new CreatingPedidoLigacaoDto(expectedJogadorInicio, expectedJogadorObjetivo);
            
            Assert.NotNull(dto);
            Assert.Equal(expectedJogadorInicio,dto.jogadorInicio);
            Assert.Equal(expectedJogadorObjetivo,dto.jogadorObjetivo);
        }
    }
}