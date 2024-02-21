using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.Shared;
using Xunit;

namespace DDDSample1.TestesUnitariosDomain.Jogadores
{
    public class EmailTest
    {
        [Fact]
        public void EmailConstructorTest()
        {
            string expectedEmail = "miguel@gmail.com";

            Email email = new Email(expectedEmail);
            
            Assert.NotNull(email);
            Assert.Equal(expectedEmail,email._Email);
            Assert.Throws<BusinessRuleValidationException>(() => new Email("aaaaaaaaa"));
        }
    }
}