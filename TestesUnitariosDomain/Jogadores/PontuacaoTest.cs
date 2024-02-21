using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.Shared;
using Xunit;

namespace DDDSample1.TestesUnitariosDomain.Jogadores
{
    public class PontuacaoTest
    {
        [Fact]
        public void PontuacaoConstructorTest()
        {
            int expectedPontuacao = 10;
            
            Pontuacao pontuacao = new Pontuacao(expectedPontuacao);
            
            Assert.NotNull(pontuacao);
            Assert.Equal(expectedPontuacao,pontuacao._Pontuacao);
            Assert.Throws<BusinessRuleValidationException>(() => new Pontuacao(-5));
        }
    }
}