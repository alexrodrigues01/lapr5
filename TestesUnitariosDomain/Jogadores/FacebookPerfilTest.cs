using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.Shared;
using Xunit;

namespace DDDSample1.TestesUnitariosDomain.Jogadores
{
    public class FacebookPerfilTest
    {
        [Fact]
        public void FacebookPerfilConstructorTest()
        {
            string expectedFacebookLink = "www.facebook.com/onlynoelle";

            FacebookPerfil facebookPerfil = new FacebookPerfil(expectedFacebookLink);
            
            Assert.NotNull(facebookPerfil);
            Assert.Equal(expectedFacebookLink,facebookPerfil._FacebookPerfil);
            Assert.Throws<BusinessRuleValidationException>(() => new FacebookPerfil(""));
        }
    }
}