using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.Shared;
using Xunit;

namespace DDDSample1.TestesUnitariosDomain.Jogadores
{
    public class DataNascimentoTest
    {
        [Fact]
        public void DataNascimentoConstructorTest()
        {
            string expectedData = "09/09/2020";

            DataNascimento dataNascimento = new DataNascimento(expectedData);
            
            Assert.NotNull(dataNascimento);
            Assert.Equal(expectedData,dataNascimento._DataNascimento.ToShortDateString());
            Assert.Throws<BusinessRuleValidationException>(() => new DataNascimento("15-09-2020"));
        }
    }
}