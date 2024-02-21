using DDDSample1.Domain.EstadosHumor;
using DDDSample1.Domain.Shared;
using Xunit;

namespace DDDNetcore.TestesUnitariosDomain.EstadosHumor
{
    public class DataEstadoHumorTest
    {
        [Fact]
        public void DataEstadoHumorConstructorTest()
        {
            string expectedData = "09/09/2020";

            DataEstadoHumor dataEstadoHumor = new DataEstadoHumor(expectedData);
            
            Assert.NotNull(dataEstadoHumor);
            Assert.Equal(expectedData, dataEstadoHumor._DataEstadoHumor.ToShortDateString());
            Assert.Throws<BusinessRuleValidationException>(() => new DataEstadoHumor("14-09-2020"));
        }
    }
}