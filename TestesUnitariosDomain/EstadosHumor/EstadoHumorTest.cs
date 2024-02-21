using DDDSample1.Domain.EstadosHumor;
using Xunit;

namespace DDDNetCore.TestesUnitariosDomain.EstadosHumor
{
    public class EstadoHumorTest
    {
        [Fact]
        public void EstadoHumorConstructorTest()
        {
            string expectedEstado = "Joyful";
            string expectedDataEstado = "09/09/2020";

            EstadoHumor estadoHumor = new EstadoHumor(expectedEstado, expectedDataEstado);
            
            Assert.NotNull(estadoHumor);
            Assert.Equal(expectedEstado,estadoHumor.Estado.ToString());
            Assert.Equal(expectedDataEstado, estadoHumor.DataEstadoHumor._DataEstadoHumor.ToShortDateString());
        }

        [Fact]
        public void ChangeEstadoHumorTest()
        {
            string estado = "Joyful";
            string dataEstado = "09/09/2020";

            EstadoHumor estadoHumor = new EstadoHumor(estado, dataEstado);

            string expectedEstado = "Distressed";
            estadoHumor.changeEstadoHumor(expectedEstado);
            
            Assert.Equal(expectedEstado,estadoHumor.Estado.ToString());
        }

        [Fact]
        public void ChangeDataTest()
        {
            string estado = "Joyful";
            string dataEstado = "09/09/2020";

            EstadoHumor estadoHumor = new EstadoHumor(estado, dataEstado);

            string expectedData = "10/10/2020";
            estadoHumor.changeData(expectedData);
            
            Assert.Equal(expectedData,estadoHumor.DataEstadoHumor._DataEstadoHumor.ToShortDateString());
        }
    }
}