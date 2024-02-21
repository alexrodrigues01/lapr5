using DDDSample1.Domain.Tags;
using Xunit;

namespace DDDSample1.TestesUnitariosDomain.Tags
{
    public class TagTest
    {
        [Fact]
        public void TagConstructorTest()
        {
            string expectedDescricao = "ISEP";

            Tag tag = new Tag(expectedDescricao);
            
            Assert.NotNull(tag);
            Assert.Equal(expectedDescricao,tag.Descricao._Descricao);
        }
    }
}