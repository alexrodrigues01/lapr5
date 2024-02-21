using DDDSample1.Domain.Jogadores;
using Xunit;

namespace DDDSample1.TestesUnitariosDomain.Jogadores
{
    public class CreatingJogadorDtoTest
    {
        [Fact]
        public void CreatingJogadorDtoConstructorTest()
        {
            string Nome = "Noelle";
            string Email = "noelle@gmail.com";
            string Telefone = "915888333";
            string Pais = "Portugal";
            string Rua = "Rua de Cima";
            string Localidade = "Covelas";
            string CodigoPostal = "4785"; //049
            string DataNascimento = "09/09/2020";
            string LinkedInLink = "www.linkedin.com/onlynoelle";
            string FacebookLink = "www.facebook.com/onlynoelle";
            string InterestTags = "Noelle,Miguel";
            string Estado = "Joyful";
            string DataEstadoHumor = "09/09/2020";

            CreatingJogadorDto dto = new CreatingJogadorDto(Nome,Email,Telefone,Pais,Rua,Localidade,CodigoPostal,DataNascimento,LinkedInLink,FacebookLink,InterestTags,Estado,DataEstadoHumor);
            
            Assert.NotNull(dto);
            
            Assert.Equal(Nome,dto.Nome);
            Assert.Equal(Email,dto.Email);
            Assert.Equal(Telefone,dto.Telefone);
            Assert.Equal(Pais,dto.Pais);
            Assert.Equal(Rua,dto.Rua);
            Assert.Equal(Localidade,dto.Localidade);
            Assert.Equal(CodigoPostal,dto.CodigoPostal);
            Assert.Equal(LinkedInLink,dto.LinkedInLink);
            Assert.Equal(FacebookLink,dto.FacebookLink);
            Assert.Equal(InterestTags,dto.InterestTags);
            Assert.Equal(Estado,dto.Estado);
            Assert.Equal(DataEstadoHumor,dto.DataEstadoHumor);
        }
        
    }
}