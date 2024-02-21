using DDDSample1.Domain.Introducoes;
using Xunit;

namespace DDDSample1.TestesUnitariosDomain.Introducoes
{
    public class CreatingIntroducaoDtoTest
    {
        
        [Fact]
        public void CreatingIntroducaoDtoConstructorTest()
        {
            string expectedMensagemIntroducaoIntermedio = "Ola";
            string expectedMensagemIntroducaoObjetivo = "Adeus";
            string expectedJogadorInicio = "1";
            string expectedJogadorIntermedio = "2";
            string expectedJogadorObjetivo = "3";

            CreatingIntroducaoDto dto = new CreatingIntroducaoDto(expectedMensagemIntroducaoIntermedio,
                expectedMensagemIntroducaoObjetivo, expectedJogadorInicio, expectedJogadorIntermedio,
                expectedJogadorObjetivo);
            
            Assert.NotNull(dto);
            Assert.Equal(expectedMensagemIntroducaoIntermedio,dto.MensagemIntroducaoIntermedio);
            Assert.Equal(expectedMensagemIntroducaoObjetivo,dto.MensagemIntroducaoObjetivo);
            Assert.Equal(expectedJogadorInicio,dto.JogadorInicio);
            Assert.Equal(expectedJogadorIntermedio,dto.JogadorIntermedio);
            Assert.Equal(expectedJogadorObjetivo,dto.JogadorObjetivo);
        }
    }
}