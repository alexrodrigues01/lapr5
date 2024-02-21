using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.Shared;
using Xunit;

namespace DDDSample1.TestesUnitariosDomain.Jogadores
{
    public class NomeTest
    {
        [Fact]
        public void NomeConstructorTest()
        {
            string expectedNome = "Pedro";

            Nome nome = new Nome(expectedNome);
            
            Assert.NotNull(nome);
            Assert.Equal(expectedNome,nome._Nome);
            Assert.Throws<BusinessRuleValidationException>(() => new Nome(""));
        }
    }
}