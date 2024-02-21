using DDDNetcore.Domain.Relacoes;
using Xunit;

namespace DDDNetcore.TestesUnitariosDomain.Relacoes
{
    public class CreatingRelacaoDtoTest
    {
        [Fact]
        public void CreatingRelacaoDtoConstructorTest()
        {
            string expectedTagsRelacao = "ISEP,Engenharia,Informática";
            int expectedForcaLigacao = 10;
            string expectedDataRelacao = "10/09/2020";

            CreatingRelacaoDto dto =
                new CreatingRelacaoDto(expectedTagsRelacao, expectedForcaLigacao, expectedDataRelacao);
            
            Assert.NotNull(dto);
            Assert.Equal(expectedTagsRelacao,dto.TagsRelacao);
            Assert.Equal(expectedForcaLigacao,dto.ForcaLigacao);
            Assert.Equal(expectedDataRelacao,dto.DataRelacao);
        }
        
    }
}