using System.Collections.Generic;
using DDDNetcore.Domain.Relacoes;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.Tags;
using Xunit;

namespace DDDNetcore.TestesUnitariosDomain.Relacoes
{
    public class RelacaoTest
    {
        [Fact]
        public void RelacaoConstructorTest()
        {
            JogadorId expectedJogadorIdA = new JogadorId("00000000-0000-0000-0000-000000000000");
            JogadorId expectedJogadorIdB = new JogadorId("00000000-0000-0000-0000-000000000001");

            TagidString tag = new TagidString("ISEP");
            List<TagidString> expectedList = new List<TagidString>();
            expectedList.Add(tag);

            int expectedForcaLigacao = 15;
            string expectedDataRelacao = "09/09/2020";

            Relacao relacao = new Relacao(expectedJogadorIdA, expectedJogadorIdB, expectedList, expectedForcaLigacao,
                expectedDataRelacao);
            
            Assert.NotNull(relacao);
            Assert.Equal(expectedJogadorIdA,relacao.JogadorA);
            Assert.Equal(expectedJogadorIdB,relacao.JogadorB);
            Assert.Equal(expectedList[0],relacao.TagsRelacao[0]);
            Assert.Equal(expectedForcaLigacao,relacao.ForcaLigacao._ForcaLigacao);
            Assert.Equal(expectedDataRelacao,relacao.DataRelacao._DataRelacao.ToShortDateString());
            
        }

        [Fact]
        public void ChangeForcaLigacaoTest()
        {
            JogadorId jogadorIdA = new JogadorId("00000000-0000-0000-0000-000000000000");
            JogadorId jogadorIdB = new JogadorId("00000000-0000-0000-0000-000000000001");

            TagidString tag = new TagidString("ISEP");
            List<TagidString> list = new List<TagidString>();
            list.Add(tag);

            int forcaLigacao = 15;
            string dataRelacao = "10/09/2020";

            Relacao relacao = new Relacao(jogadorIdA, jogadorIdB, list, forcaLigacao,
                dataRelacao);

            int expectedForcaLigacao = 99;
            relacao.ChangeForcaLigacao(expectedForcaLigacao);
            
            Assert.Equal(expectedForcaLigacao,relacao.ForcaLigacao._ForcaLigacao);
        }

        [Fact]
        public void ChangeTagsTest()
        {
            JogadorId jogadorIdA = new JogadorId("00000000-0000-0000-0000-000000000000");
            JogadorId jogadorIdB = new JogadorId("00000000-0000-0000-0000-000000000001");

            TagidString tag = new TagidString("ISEP");
            List<TagidString> list = new List<TagidString>();
            list.Add(tag);

            int forcaLigacao = 15;
            string dataRelacao = "10/09/2020";

            Relacao relacao = new Relacao(jogadorIdA, jogadorIdB, list, forcaLigacao,
                dataRelacao);

            TagidString newTag = new TagidString("Engenharia");
            List<TagidString> expectedList = new List<TagidString>();
            expectedList.Add(newTag);
            
            relacao.ChangeTags(expectedList);
            
            Assert.Equal(expectedList[0],relacao.TagsRelacao[0]);
        }
    }
}