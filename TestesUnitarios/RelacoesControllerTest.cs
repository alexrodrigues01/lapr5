using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DDDNetcore.Controllers;
using DDDNetcore.Domain.Relacoes;
using DDDNetCore.Domain.Relacoes;
using DDDNetCore.Domain.Tags;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.Tags;
using Moq;
using Xunit;
using Xunit.Abstractions;
namespace DDDSample1.TestesUnitarios
{
    public class RelacoesControllerTest
    {
        private Mock<IRelacaoService> _mock;

        private Mock<ITagService> _tagMock;

        private RelacoesController _relacoesController;

        private Guid _id;

        private RelacaoId _relacaoId;

        private RelacaoDto _relacaoDto;

        private List<RelacaoDto> listaDto;


        public RelacoesControllerTest()
        {
            _mock = new Mock<IRelacaoService>();
            _tagMock = new Mock<ITagService>();
            _relacoesController = new RelacoesController(_mock.Object,_tagMock.Object);
            _id = new Guid();
            _relacaoId = new RelacaoId(_id);
            listaDto = new List<RelacaoDto>();
            TagidString tagidString1 = new TagidString("1");
            List<TagidString> listaTagids = new List<TagidString>();
            listaTagids.Add(tagidString1);
            Relacao relacao = new Relacao(new JogadorId(new Guid()), new JogadorId(new Guid()), listaTagids, 2,
                "21/03/2001");
            _relacaoDto = new RelacaoDto()
            {
                Id = _id, JogadorA = new JogadorId(new Guid()).Value, JogadorB = new JogadorId(new Guid()).Value,
                ForcaLigacao = relacao.ForcaLigacao._ForcaLigacao,
                DataRelacao = relacao.DataRelacao._DataRelacao.ToString()
            };
            listaDto.Add(_relacaoDto);
        }
        
        
        [Fact]
        public async void GetAll()
        {
            _mock.Setup(x => x.GetAllAsync()).Returns(Task<List<RelacaoDto>>.FromResult(listaDto));
            var result = await _relacoesController.GetAll();
            Assert.Equal(listaDto[0],result.Value.First());
        }

        [Fact]
        public async void GetGetById()
        {
            _mock.Setup(x => x.GetByIdAsync(It.IsAny<RelacaoId>())).Returns(Task<RelacaoDto>.FromResult(_relacaoDto));
            var result = await _relacoesController.GetGetById(_id);
            Assert.Equal(result.Value.JogadorA,_relacaoDto.JogadorA);
        }
        
        [Fact]
        public async void Update()
        {
            _mock.Setup(x => x.UpdateAsync(_relacaoDto)).Returns(Task<RelacaoDto>.FromResult(_relacaoDto));
            var result = await _relacoesController.Update(_relacaoId.AsGuid(),_relacaoDto);
            Assert.Equal(_relacaoDto.JogadorA,result.Value.JogadorA);
        }
        
        [Fact]
        public async void HardDelete()
        {
            _mock.Setup(x => x.DeleteAsync(It.IsAny<RelacaoId>())).Returns(Task<RelacaoDto>.FromResult(_relacaoDto));
            var result = await _relacoesController.HardDelete(_id);
           
            Assert.Equal(_relacaoDto.JogadorA,result.Value.JogadorA);
        }
        
        
    }
}