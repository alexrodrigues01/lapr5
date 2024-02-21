using DDDSample1.Domain.EstadosHumor;
using Xunit;

namespace DDDSample1.TestesUnitariosDomain.EstadosHumor
{
    public class CreatingEstadoHumorDtoTest
    {
        [Fact]
        public void CreatingEstadoHumorDtoConstructorTest()
        {
            string expectedEstado = "Joyful";
            string expectedDataEstado = "09/09/2020";

            CreatingEstadoHumorDto dto = new CreatingEstadoHumorDto(expectedEstado, expectedDataEstado);
            
            Assert.NotNull(dto);
            Assert.Equal(expectedEstado,dto.Estado);
            Assert.Equal(expectedDataEstado,dto.DataEstado);
        }
    }
}