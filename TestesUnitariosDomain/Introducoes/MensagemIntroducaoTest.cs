using DDDSample1.Domain.Introducoes;
using Xunit;

namespace DDDSample1.TestesUnitariosDomain.Introducoes
{
    public class MensagemIntroducaoTest
    {
        [Fact]
        public void MensagemIntroducaoConstrutorTest()
        {
            string expectedMensagemIntroducao = "Ola";

            MensagemIntroducao mensagemIntroducao = new MensagemIntroducao(expectedMensagemIntroducao);
            
            Assert.NotNull(mensagemIntroducao);
            Assert.Equal(expectedMensagemIntroducao,mensagemIntroducao._MensagemIntroducao);
        }
    }
}