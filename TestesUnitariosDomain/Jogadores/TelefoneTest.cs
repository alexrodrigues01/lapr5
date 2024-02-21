using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.Shared;
using Xunit;

namespace DDDSample1.TestesUnitariosDomain.Jogadores
{
    public class TelefoneTest
    {
        [Fact]
        public void TelefoneConstructorTest()
        {
            string expectedTelefone = "911111111";

            Telefone telefone = new Telefone(expectedTelefone);
            
            Assert.NotNull(telefone);
            Assert.Equal(expectedTelefone,telefone._Telefone);
            Assert.Throws<BusinessRuleValidationException>(() => new Telefone("22525525"));
            Assert.Throws<BusinessRuleValidationException>(() => new Telefone(""));
        }
    }
}