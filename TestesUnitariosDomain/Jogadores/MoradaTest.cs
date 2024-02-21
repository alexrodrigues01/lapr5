using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.Shared;
using Xunit;

namespace DDDSample1.TestesUnitariosDomain.Jogadores
{
    public class MoradaTest
    {
        [Fact]
        public void MoradaConstructorTest()
        {
            string Pais = "Portugal";
            string Rua = "Rua de Cima";
            string Localidade = "Covelas";
            string CodigoPostal = "4785"; //049

            Morada morada = new Morada(Pais, Rua, Localidade, CodigoPostal);
            
            Assert.NotNull(morada);
            Assert.Equal(Pais,morada._Pais.ToString());
            Assert.Equal(Rua,morada._Rua);
            Assert.Equal(Localidade,morada._Localidade);
            Assert.Equal(CodigoPostal,morada._CodigoPostal);
            Assert.Throws<BusinessRuleValidationException>(() => new Morada("","","",""));
        }
    }
}