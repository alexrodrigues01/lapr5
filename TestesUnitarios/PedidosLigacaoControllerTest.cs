using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using DDDNetcore.Domain.Relacoes;
using DDDNetCore.Domain.Relacoes;
using DDDSample1.ALGAV;
using DDDSample1.Controllers;
using DDDSample1.Domain.EstadosHumor;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.PedidosLigacao;
using DDDSample1.Domain.Relacoes;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Tags;
using Moq;
using Xunit;

namespace DDDSample1.TestesUnitarios
{
    public class PedidosLigacaoControllerTest
    {
        private Mock<IPedidoLigacaoService> _mock;
        
        private readonly Mock<IUnitOfWork> unitOfWork;
        
        private readonly Mock<IPedidoLigacaoRepository> _repo;
        private readonly Mock<IRelacaoRepository> _repoRelacao;
        private readonly Mock<ITagRepository> _tagRepo;
         private Mock<IIA> ai;
        private PedidosLigacaoController controller;
        
        private CreatingJogadorDto _creatingJogadorDto1;
        private CreatingJogadorDto _creatingJogadorDto2;
        private CreatingPedidoLigacaoDto _creatingPedidoLigacaoDto;

        private PedidoLigacaoDto _pedidoLigacaoDto;
        private List<PedidoLigacaoDto> _pedidoLigacaoDtos;


        private Guid id1g;
        private Guid id2g;
        private JogadorId id1;
        private JogadorId id2;

        private JogadorDto jogadorDtofinal1;
        private JogadorDto jogadorDtofinal2;

        private PedidoLigacao pedidoLigacao;
        private PedidoLigacaoId _pedidoLigacaoId;

        private Guid idP;
        private Guid idR;

        private Relacao _relacao;
        private RelacaoDto _relacaoDto;
        private CreatingRelacaoDto _creatingRelacaoDto;
       

        public PedidosLigacaoControllerTest()
        {
            
            _mock = new Mock<IPedidoLigacaoService>();
            _repo = new Mock<IPedidoLigacaoRepository>();
            _repoRelacao = new Mock<IRelacaoRepository>();
            _tagRepo = new Mock<ITagRepository>();
            ai = new Mock<IIA>();
            
            controller = new PedidosLigacaoController(_mock.Object,ai.Object);
            
            id1g = new Guid();
            id1 = new JogadorId(id1g);
            id2g = new Guid();
            id2 = new JogadorId(id2g);

            _pedidoLigacaoDtos = new List<PedidoLigacaoDto>();
            
            TagidString tagidString1 = new TagidString("1");
            List<TagidString> listaTagids = new List<TagidString>();
            listaTagids.Add(tagidString1);
            String listaTagsString = "1";
            Jogador jogador1 = new Jogador("Ruben", "ruben@gmail.com", "916963933", "Portugal", "Rua de cima", "Trofa", 
                "4785-049", "10/10/2001", "link1", "link2", listaTagids, new EstadoHumorId(new Guid()));
            _creatingJogadorDto1 = new CreatingJogadorDto(jogador1.Nome._Nome, jogador1.Email._Email,
                jogador1.Telefone._Telefone, jogador1.Morada._Pais.ToString(), jogador1.Morada._Rua.ToString(),
                jogador1.Morada._Localidade.ToString(), jogador1.Morada._CodigoPostal.ToString(),
                jogador1.DataNascimento.ToString(), jogador1.LinkedInPerfil._LinkedInPerfil,
                jogador1.FacebookPerfil._FacebookPerfil, listaTagsString, "Joyful", "10/10/2001");
            Jogador jogador2 = new Jogador("Noelle", "noelle@gmail.com", "916963934", "Portugal", "Rua de cima", "Trofa", 
                "4785-049", "10/10/2001", "link1", "link2", listaTagids, new EstadoHumorId(new Guid()));
            _creatingJogadorDto2 = new CreatingJogadorDto(jogador2.Nome._Nome, jogador2.Email._Email,
                jogador2.Telefone._Telefone, jogador2.Morada._Pais.ToString(), jogador2.Morada._Rua.ToString(),
                jogador2.Morada._Localidade.ToString(), jogador2.Morada._CodigoPostal.ToString(),
                jogador2.DataNascimento.ToString(), jogador2.LinkedInPerfil._LinkedInPerfil,
                jogador2.FacebookPerfil._FacebookPerfil, listaTagsString, "Joyful", "10/10/2001");
            jogadorDtofinal1 = new JogadorDto{ Id = id1.AsGuid(), Nome = jogador1.Nome._Nome,Email=jogador1.Email._Email,
                Telefone=jogador1.Telefone._Telefone,DataNascimento=jogador1.DataNascimento._DataNascimento.ToString(),
                Pais = jogador1.Morada._Pais.ToString(),Rua=jogador1.Morada._Rua,Localidade = jogador1.Morada._Localidade,
                CodigoPostal= jogador1.Morada._CodigoPostal,LinkedInLink = jogador1.LinkedInPerfil._LinkedInPerfil,
                FacebookLink = jogador1.FacebookPerfil._FacebookPerfil,InterestTags = jogador1.InterestTags,EstadoHumor = jogador1.EstadoHumor.Value};
            jogadorDtofinal2 = new JogadorDto{ Id = id2.AsGuid(), Nome = jogador2.Nome._Nome,Email=jogador2.Email._Email,
                Telefone=jogador2.Telefone._Telefone,DataNascimento=jogador2.DataNascimento._DataNascimento.ToString(),
                Pais = jogador2.Morada._Pais.ToString(),Rua=jogador2.Morada._Rua,Localidade = jogador2.Morada._Localidade,
                CodigoPostal= jogador2.Morada._CodigoPostal,LinkedInLink = jogador2.LinkedInPerfil._LinkedInPerfil,
                FacebookLink = jogador2.FacebookPerfil._FacebookPerfil,InterestTags = jogador2.InterestTags,EstadoHumor = jogador2.EstadoHumor.Value};
            idP = new Guid();
            _pedidoLigacaoId = new PedidoLigacaoId(idP);
            pedidoLigacao = new PedidoLigacao(id1, id2);
            _creatingPedidoLigacaoDto = new CreatingPedidoLigacaoDto (pedidoLigacao.jogadorInicio.Value, pedidoLigacao.jogadorObjetivo.Value);
            _pedidoLigacaoDto = new PedidoLigacaoDto{Id = _pedidoLigacaoId, jogadorInicio = pedidoLigacao.jogadorInicio, jogadorObjetivo = pedidoLigacao.jogadorObjetivo};
            _pedidoLigacaoDtos.Add(_pedidoLigacaoDto);
            
            _relacao = new Relacao(new JogadorId(new Guid()), new JogadorId(new Guid()), listaTagids, 2,
                "21/03/2001");
            _relacaoDto = new RelacaoDto()
            {
                Id = new Guid(), JogadorA = new JogadorId(new Guid()).Value, JogadorB = new JogadorId(new Guid()).Value,
                ForcaLigacao = _relacao.ForcaLigacao._ForcaLigacao,
                DataRelacao = _relacao.DataRelacao._DataRelacao.ToString()
            };
            _creatingRelacaoDto = new CreatingRelacaoDto(_relacao.TagsRelacao.ToString(),_relacao.ForcaLigacao._ForcaLigacao,_relacao.DataRelacao._DataRelacao.ToString());
        }

        [Fact]
        public async void GetAllTest()
        {
            _mock.Setup(x => x.GetAllAsync()).Returns(Task<List<PedidoLigacaoDto>>.FromResult(_pedidoLigacaoDtos));
            var result = await controller.getAll();
            Assert.Equal(_pedidoLigacaoDtos[0],result.Value.First());
        }

        [Fact]
        public async void GetById()
        {
            _mock.Setup(x => x.GetByIdAsync(It.IsAny<PedidoLigacaoId>())).Returns(Task<PedidoLigacaoDto>.FromResult(_pedidoLigacaoDto));
            var result = await controller.GetById(idP);
            Assert.Equal(_pedidoLigacaoDto,result.Value);
        }

        [Fact]
        public async void CreateTest()
        {
            _mock.Setup(x => x.AddAsync(_creatingPedidoLigacaoDto)).Returns(Task<JogadorDto>.FromResult(_pedidoLigacaoDto));
            var result = await controller.Create(_creatingPedidoLigacaoDto);
            Assert.Equal(_pedidoLigacaoDto.jogadorInicio,result.Value.jogadorInicio);
        }

        [Fact]
        public async void Delete()
        {
            _mock.Setup(x => x.DeleteAsync(It.IsAny<PedidoLigacaoId>(),It.IsAny<string>(),_creatingRelacaoDto)).Returns(Task<RelacaoDto>.FromResult(_relacaoDto));
            var result = await controller.Delete(idP, "1", _creatingRelacaoDto);
            Assert.Equal(_relacaoDto.JogadorA, result.Value.JogadorA);
        }

        [Fact]
        public async void CreatePedidos()
        {
            _mock.Setup(x => x.AddAsync(It.IsAny<Guid>(), It.IsAny<string>()))
                .Returns(Task<List<PedidoLigacaoDto>>.FromResult(_pedidoLigacaoDtos));
            var result = await controller.CreatePedidos(id1g,"x");
            Assert.Equal(_pedidoLigacaoDtos[0],result.Value.First());
        }

        [Fact]
        public async void getPedidosLigacaoPendentes()
        {
            // _mock.Setup(x => x.getPedidosLigacaoPendentes(It.IsAny<string>()))
            //     .Returns(Task<List<PedidoLigacaoDto>>.FromResult(_pedidoLigacaoDtos));
            // var result = await controller.getPedidosLigacaoPendentes("x");
            // Assert.Equal(_pedidoLigacaoDtos[0],result.Value.First());
        }

        [Fact]
        public async void HardDelete()
        {
            _mock.Setup(x => x.DeleteAsync(It.IsAny<PedidoLigacaoId>()))
                .Returns(Task<PedidoLigacaoDto>.FromResult(_pedidoLigacaoDto));
            var result = await controller.HardDelete(new Guid());
            Assert.Equal(_pedidoLigacaoDto.jogadorInicio,result.Value.jogadorInicio);
        }
    }
}