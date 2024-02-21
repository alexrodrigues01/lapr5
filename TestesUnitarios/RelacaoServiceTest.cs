using System.Collections.Generic;
using DDDNetcore.Domain.Relacoes;
using DDDNetCore.Domain.Relacoes;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Tags;
using Moq;
using Xunit;

namespace DDDSample1.TestesUnitarios
{
    public class RelacaoServiceTest
    {
        private Mock<IUnitOfWork> _unit;
        private Mock<IRelacaoService> _mock;
        private Mock <ITagRepository> _tagRepo;
        private RelacaoId _relacaoId;
        private RelacaoDto _relacaoDto;
        private List<RelacaoDto> listaDto;
        
        public RelacaoServiceTest() {}
        
        [Fact]
        public async void GetAllAsyncTest() {}
        
        [Fact]
        public async void GetByIdAsyncTest(){}

        [Fact]
        public async void UpdateAsyncTest() {}
        
        [Fact]
        public async void DeleteAsyncTest(){}
        
        [Fact]
        public async void GetRelacoesTest(){}
    }
}