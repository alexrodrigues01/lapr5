using DDDSample1.Domain.Relacoes;
using DDDSample1.Domain.Shared;
using Xunit;

namespace DDDNetcore.TestesUnitariosDomain.Relacoes
{
    public class ForcaLigacaoTest
    {
        [Fact]
        public void ForcaLigacaoConstructorTest()
        {
            int expectedForcaLigacao = 17;

            ForcaLigacao forcaLigacao = new ForcaLigacao(expectedForcaLigacao);
            
            Assert.NotNull(forcaLigacao);
            Assert.Equal(expectedForcaLigacao,forcaLigacao._ForcaLigacao);
            Assert.Throws<BusinessRuleValidationException>(() => new ForcaLigacao(115));
        }
    }
}