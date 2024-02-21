using DDDSample1.Domain.Relacoes;
using Xunit;

namespace DDDNetcore.TestesUnitariosDomain.Relacoes
{
    public class ForcaRelacaoTest
    {
        [Fact]
        public void ForcaRelacaoConstructorTest()
        {
            int expectedForcaRelacao = 17;

            ForcaRelacao forcaRelacao = new ForcaRelacao(expectedForcaRelacao);
            
            Assert.NotNull(forcaRelacao);
            Assert.Equal(expectedForcaRelacao,forcaRelacao._ForcaRelacao);
        }
    }
}