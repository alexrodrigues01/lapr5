using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Tags;
using Xunit;

namespace DDDSample1.TestesUnitariosDomain.Tags
{
    public class DescricaoTest
    {
        [Fact]
        public void DescricaoConstructorTest()
        {
            string expectedDescricao = "ISEP";

            Descricao descricao = new Descricao(expectedDescricao);
            
            Assert.NotNull(descricao);
            Assert.Equal(expectedDescricao,descricao._Descricao);
            Assert.Throws<BusinessRuleValidationException>(() => new Descricao(""));
        }
    }
}