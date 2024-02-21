using DDDSample1.Domain.Relacoes;
using DDDSample1.Domain.Shared;
using Xunit;

namespace DDDNetcore.TestesUnitariosDomain.Relacoes
{
    public class DataRelacaoTest
    {
        [Fact]
        public void DataRelacaoConstructorTest()
        {
            string expectedData = "09/09/2020";

            DataRelacao dataRelacao = new DataRelacao(expectedData);
            
            Assert.NotNull(dataRelacao);
            Assert.Equal(expectedData,dataRelacao._DataRelacao.ToShortDateString());
            Assert.Throws<BusinessRuleValidationException>(() => new DataRelacao("14-09-2020"));
        }
    }
}