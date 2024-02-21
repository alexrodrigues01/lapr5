using DDDSample1.Domain.Introducoes;
using Xunit;

namespace DDDSample1.TestesUnitariosDomain.Introducoes
{
    public class IntroducaoTest
    {
        [Fact]
        public void IntroducaoConstructorTest()
        {
            string expectedMensagemIntroducaoIntermedio = "Ola";
            string expectedMensagemIntroducaoObjetivo = "Adeus";
            string expectedJogadorInicio = "00000000-0000-0000-0000-000000000000";
            string expectedJogadorIntermedio = "00000000-0000-0000-0000-000000000001";
            string expectedJogadorObjetivo = "00000000-0000-0000-0000-000000000002";

            Introducao introducao = new Introducao(expectedMensagemIntroducaoIntermedio,expectedMensagemIntroducaoObjetivo, expectedJogadorInicio, expectedJogadorIntermedio,
                expectedJogadorObjetivo);
            
            Assert.NotNull(introducao);
            Assert.Equal(expectedMensagemIntroducaoIntermedio,introducao.MensagemIntroducaoIntermedio._MensagemIntroducao);
            Assert.Equal(expectedMensagemIntroducaoObjetivo,introducao.MensagemIntroducaoObjetivo._MensagemIntroducao);
            Assert.Equal(expectedJogadorInicio,introducao.JogadorInicio.AsString());
        }
    }
}