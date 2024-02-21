using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DDDNetCore.Controllers;
using DDDSample1.Domain.Introducoes;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.PedidosLigacao;
using Moq;
using Xunit;
using Xunit.Abstractions;

namespace DDDSample1.TestesUnitarios
{
    public class IntroducoesControllerTest
    {
        private Mock<IIntroducaoService> _mock;

        private IntroducoesController _Controller;

        private Guid _id;

        private IntroducaoId _introducaoId;

        private IntroducaoDto _introducaoDto;

        private PedidoLigacaoDto _pedidoLigacaoDto;

        private CreatingIntroducaoDto _creatingIntroducaoDto;

        private List<IntroducaoDto> listaDto;

        public IntroducoesControllerTest()
        {
            _mock = new Mock<IIntroducaoService>();
            _Controller = new IntroducoesController(_mock.Object);
            _id = new Guid();
            _introducaoId = new IntroducaoId(_id);
            listaDto = new List<IntroducaoDto>();
            Introducao introducao = new Introducao("Intermedio", "Objetivo", new JogadorId(new Guid()).Value,
            new JogadorId(new Guid()).Value, new JogadorId(new Guid()).Value);
            _introducaoDto = new IntroducaoDto
            {
                Id = _introducaoId.AsGuid(),
                MensagemIntroducaoIntermedio = introducao.MensagemIntroducaoIntermedio._MensagemIntroducao,
                MensagemIntroducaoObjetivo = introducao.MensagemIntroducaoObjetivo._MensagemIntroducao,
                JogadorIntermedio = introducao.JogadorIntermedio.AsString(),
                JogadorInicio = introducao.JogadorInicio.AsString(),
                JogadorObjetivo = introducao.JogadorObjetivo.AsString()
            };

            PedidoLigacao pedidoLigacao = new PedidoLigacao(new JogadorId(new Guid()), new JogadorId(new Guid()));
            _pedidoLigacaoDto = new PedidoLigacaoDto
            {
                Id = new PedidoLigacaoId(new Guid()), jogadorInicio = pedidoLigacao.jogadorInicio,
                jogadorObjetivo = pedidoLigacao.jogadorObjetivo
            };
            
            listaDto.Add(_introducaoDto);
        }

        [Fact]
        public async void GetAll()
        {
            _mock.Setup(x => x.GetAllAsync()).Returns(Task<List<IntroducaoDto>>.FromResult(listaDto));
            var result = await _Controller.GetAll();
            Assert.Equal(listaDto[0],result.Value.First());
        }

        [Fact]
        public async void Create()
        {
            _mock.Setup(x => x.AddAsync(_creatingIntroducaoDto)).Returns(Task<JogadorDto>.FromResult(_introducaoDto));
            var result = await _Controller.Create(_creatingIntroducaoDto);
            Assert.Equal(_introducaoDto.JogadorInicio,result.Value.JogadorInicio);
        }

        [Fact]
        public async void Delete()
        {
            _mock.Setup(x => x.DeleteAsync(It.IsAny<IntroducaoId>(),It.IsAny<String>())).Returns(Task<PedidoLigacaoDto>.FromResult(_pedidoLigacaoDto));
            var result = await _Controller.Delete(_id, "1");
           
            Assert.Equal(_pedidoLigacaoDto.jogadorInicio,result.Value.jogadorInicio);
        }

        [Fact]
        public async void GetIntroducoesByUser()
        {
            _mock.Setup(x => x.GetIntroducoesByUser(It.IsAny<String>()))
                .Returns(Task<List<IntroducaoDto>>.FromResult(listaDto));
            var result = await _Controller.GetIntroducoesByUser(new JogadorId(new Guid()).Value);
            Assert.Equal(listaDto[0],result.Value.First());
        }
        
    }
}