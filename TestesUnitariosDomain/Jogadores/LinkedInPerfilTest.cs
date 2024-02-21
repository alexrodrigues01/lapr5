using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.Shared;
using Xunit;

namespace DDDSample1.TestesUnitariosDomain.Jogadores
{
    public class LinkedInPerfilTest
    {
        [Fact]
        public void LinkedInPerfilConstructorTest()
        {
            string expectedLinkedInLink = "www.linkedin.com/asd";

            LinkedInPerfil linkedInPerfil = new LinkedInPerfil(expectedLinkedInLink);
            
            Assert.NotNull(linkedInPerfil);
            Assert.Equal(expectedLinkedInLink,linkedInPerfil._LinkedInPerfil);
            Assert.Throws<BusinessRuleValidationException>(() => new LinkedInPerfil(""));
        }
    }
}