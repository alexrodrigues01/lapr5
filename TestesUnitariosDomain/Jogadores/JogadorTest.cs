using System.Collections.Generic;
using DDDSample1.Domain.EstadosHumor;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.Tags;
using Xunit;

namespace DDDSample1.TestesUnitariosDomain.Jogadores
{
    public class JogadorTest
    {
        [Fact]
        public void JogadorConstructorTest()
        {
            string Nome = "Noelle";
            string Email = "noelle@gmail.com";
            string Telefone = "915888333";
            string Pais = "Portugal";
            string Rua = "Rua de Cima";
            string Localidade = "Covelas";
            string CodigoPostal = "4785"; //049
            string DataNascimento = "09/09/2001";
            string LinkedInLink = "www.linkedin.com/onlynoelle";
            string FacebookLink = "www.facebook.com/onlynoelle";

            TagidString tagidString = new TagidString("ISEP");
            List<TagidString> InterestTags = new List<TagidString>();
            InterestTags.Add(tagidString);
            
            EstadoHumorId Estado = new EstadoHumorId("00000000-0000-0000-0000-000000000000");

            Jogador jogador = new Jogador(Nome, Email, Telefone, Pais, Rua, Localidade, CodigoPostal, DataNascimento,
                LinkedInLink, FacebookLink, InterestTags, Estado);

            Assert.NotNull(jogador);
            Assert.Equal(Nome,jogador.Nome._Nome);
            Assert.Equal(Email,jogador.Email._Email);
            Assert.Equal(Telefone,jogador.Telefone._Telefone);
            Assert.Equal(Pais,jogador.Morada._Pais.ToString());
            Assert.Equal(Rua,jogador.Morada._Rua);
            Assert.Equal(Localidade,jogador.Morada._Localidade);
            Assert.Equal(CodigoPostal,jogador.Morada._CodigoPostal);
            Assert.Equal(DataNascimento,jogador.DataNascimento._DataNascimento.ToShortDateString());
            Assert.Equal(LinkedInLink,jogador.LinkedInPerfil._LinkedInPerfil);
            Assert.Equal(FacebookLink,jogador.FacebookPerfil._FacebookPerfil);
            Assert.Equal(InterestTags[0],jogador.InterestTags[0]);
            Assert.Equal(Estado,jogador.EstadoHumor);

        }

        [Fact]
        public void ChangeFieldsTest()
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

            TagidString tagidString = new TagidString("ISEP");
            List<TagidString> InterestTags = new List<TagidString>();
            InterestTags.Add(tagidString);
            
            EstadoHumorId Estado = new EstadoHumorId("00000000-0000-0000-0000-000000000000");

            Jogador jogador = new Jogador(Nome, Email, Telefone, Pais, Rua, Localidade, CodigoPostal, DataNascimento,
                LinkedInLink, FacebookLink, InterestTags, Estado);
            
            string Nome1 = "Antonio";
            string Email1 = "asd@gmail.com";
            string Telefone1 = "915866333";
            string Pais1 = "Mali";
            string Rua1 = "Rua 1";
            string Localidade1 = "Porto";
            string CodigoPostal1 = "4825"; //049
            string DataNascimento1 = "10/10/2001";
            string LinkedInLink1 = "www.linkedin.com/asd";
            string FacebookLink1 = "www.facebook.com/asd";
            int Pontuacao1 = 10;

            JogadorDto jogadorDto = new JogadorDto()
            {
                CodigoPostal = CodigoPostal1, DataNascimento = DataNascimento1, Email = Email1,
                Nome = Nome1, Rua = Rua1, Pais = Pais1, Localidade = Localidade1, LinkedInLink = LinkedInLink1,
                FacebookLink = FacebookLink1, Telefone = Telefone1, Pontuacao = Pontuacao1
            };
            
            jogador.changeFields(jogadorDto);
            
            Assert.Equal(Nome1,jogador.Nome._Nome);
            Assert.Equal(Email1,jogador.Email._Email);
            Assert.Equal(Telefone1,jogador.Telefone._Telefone);
            Assert.Equal(Pais1,jogador.Morada._Pais.ToString());
            Assert.Equal(Rua1,jogador.Morada._Rua);
            Assert.Equal(Localidade1,jogador.Morada._Localidade);
            Assert.Equal(CodigoPostal1,jogador.Morada._CodigoPostal);
            Assert.Equal(DataNascimento1,jogador.DataNascimento._DataNascimento.ToShortDateString());
            Assert.Equal(LinkedInLink1,jogador.LinkedInPerfil._LinkedInPerfil);
            Assert.Equal(FacebookLink1,jogador.FacebookPerfil._FacebookPerfil);
            Assert.Equal(Pontuacao1,jogador.Pontuacao._Pontuacao);
            
        }
    }
}