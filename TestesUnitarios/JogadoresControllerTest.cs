using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DDDNetcore.Domain.Relacoes;
using DDDNetCore.Domain.Relacoes;
using DDDSample1.ALGAV;
using DDDSample1.Controllers;
using DDDSample1.Domain.EstadosHumor;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Tags;
using Microsoft.AspNetCore.Identity;
using Microsoft.CodeAnalysis.Text;
using Moq;
using Xunit;
using Xunit.Abstractions;


namespace DDDSample1.TestesUnitarios
{
    public class JogadoresControllerTest
    {
        private  Mock<IJogadorService> _mock;

        private  Mock<IRelacaoService> _mockRela;

        private readonly Mock<IUnitOfWork> unitOfWork;

        private readonly Mock<IIA> ai;

        private readonly Mock<IRelacaoRepository> _repo;
        private readonly Mock<ITagRepository> tagRepo;

        private  JogadoresController _controller;

        private Guid _id;

        private JogadorId _jogadorId;

        private JogadorDto _jogadorDto;

        private CreatingJogadorDto _creatingJogadorDto;

        private PutJogadorDto _putJogadorDto;

        private List<JogadorDto> listaDto;


        public JogadoresControllerTest()
        {
            
            listaDto = new List<JogadorDto>();
            _mock = new Mock<IJogadorService>();
            _mockRela = new Mock<IRelacaoService>();
            ai = new Mock<IIA>();
            _controller = new JogadoresController(_mock.Object,_mockRela.Object,ai.Object);
            _id = new Guid();
            _jogadorId = new JogadorId(_id);
            TagidString tagidString1 = new TagidString("1");
            List<TagidString> listaTagids = new List<TagidString>();
            listaTagids.Add(tagidString1);
            String listaTagsString = "1";
            Jogador jogador = new Jogador("Ruben", "ruben@gmail.com", "916963933", "Portugal", "Rua de cima", "Trofa",
                "4785-049", "21/03/2001", "link1", "link2", listaTagids, new EstadoHumorId(new Guid()));
            _creatingJogadorDto = new CreatingJogadorDto(jogador.Nome._Nome, jogador.Email._Email,
                jogador.Telefone._Telefone, jogador.Morada._Pais.ToString(), jogador.Morada._Rua.ToString(),
                jogador.Morada._Localidade.ToString(), jogador.Morada._CodigoPostal.ToString(),
                jogador.DataNascimento.ToString(), jogador.LinkedInPerfil._LinkedInPerfil,
                jogador.FacebookPerfil._FacebookPerfil, listaTagsString, "Joyful", "21/03/2001");
            _jogadorDto= new JogadorDto{ Id = _jogadorId.AsGuid(), Nome = jogador.Nome._Nome,Email=jogador.Email._Email,Telefone=jogador.Telefone._Telefone,DataNascimento=jogador.DataNascimento._DataNascimento.ToString(),Pais = jogador.Morada._Pais.ToString(),Rua=jogador.Morada._Rua,Localidade = jogador.Morada._Localidade,CodigoPostal= jogador.Morada._CodigoPostal,LinkedInLink = jogador.LinkedInPerfil._LinkedInPerfil,FacebookLink = jogador.FacebookPerfil._FacebookPerfil,InterestTags = jogador.InterestTags,EstadoHumor = jogador.EstadoHumor.Value};
            _putJogadorDto = new PutJogadorDto
            {
                Id = _jogadorId.AsGuid(), Nome = jogador.Nome._Nome, Email = jogador.Email._Email,
                Telefone = jogador.Telefone._Telefone,
                DataNascimento = jogador.DataNascimento._DataNascimento.ToString(),
                Pais = jogador.Morada._Pais.ToString(), Rua = jogador.Morada._Rua,
                Localidade = jogador.Morada._Localidade, CodigoPostal = jogador.Morada._CodigoPostal,
                LinkedInLink = jogador.LinkedInPerfil._LinkedInPerfil,
                FacebookLink = jogador.FacebookPerfil._FacebookPerfil, InterestTags = listaTagsString,
                EstadoHumor = jogador.EstadoHumor.Value
            };
            listaDto.Add(_jogadorDto);
            
        }
      
        [Fact]
        public async void ReturnGetAll()
        {
            _mock.Setup(x => x.GetAllAsync()).Returns(Task<List<JogadorDto>>.FromResult(listaDto));
            var result = await _controller.GetAll();
           
            Assert.Equal(listaDto[0],result.Value.First());
        }
     


        [Fact]
        public async void Create()
        {
            _mock.Setup(x => x.AddAsync(_creatingJogadorDto)).Returns(Task<JogadorDto>.FromResult(_jogadorDto));
           var result = await _controller.Create(_creatingJogadorDto);
            Assert.Equal(_jogadorDto.Email,result.Value.Email);
        }

        [Fact]
        public async void GetByID()
        {
            _mock.Setup(x => x.GetByIdAsync(new JogadorId(_id))).Returns(Task<JogadorDto>.FromResult(_jogadorDto));
            var result = await _controller.GetById(_id);
            Assert.Equal(result.Value.Email,_jogadorDto.Email);
        }


        [Fact]
        public async void Update()
        {
            _mock.Setup(x => x.UpdateAsync(_putJogadorDto)).Returns(Task<JogadorDto>.FromResult(_jogadorDto));
            var result = await _controller.Update(_jogadorId.AsGuid(),_putJogadorDto);
            Assert.Equal(_jogadorDto.Email,result.Value.Email);
        }
    
       [Fact]
       public async void getJogadorBytelemovel()
       {
           _mock.Setup(x => x.getJogadorByTelemovel(It.IsAny<string>())).Returns(Task<JogadorDto>.FromResult(_jogadorDto));
           var result = await _controller.getJogadorByTelemovel("916963933");
           
           Assert.Equal(result.Value.Email,_jogadorDto.Email);
       }

       [Fact]
       public async void getJogadorByNome()
       {
           _mock.Setup(x => x.getJogadorByNome(It.IsAny<string>())).Returns(Task<JogadorDto>.FromResult(_jogadorDto));
           var result = await _controller.getJogadorByNome("Ruben");
           
           Assert.Equal(result.Value.Email,_jogadorDto.Email);
       }
       
       [Fact]
       public async void getJogadorByEmail()
       {
           _mock.Setup(x => x.getJogadorByEmail(It.IsAny<string>())).Returns(Task<JogadorDto>.FromResult(_jogadorDto));
           var result = await _controller.getJogadorByEmail("ruben@gmail.com");
           
           Assert.Equal(result.Value.Email,_jogadorDto.Email);
       }
       
       [Fact]
       public async void getJogadoresByPais()
       {
           _mock.Setup(x => x.getJogadoresByPais(It.IsAny<string>())).Returns(Task<List<JogadorDto>>.FromResult(listaDto));
           var result = await _controller.getJogadoresByPais("Portugal");
           
           Assert.Equal(listaDto[0],result.Value.First());
       }
       
       [Fact]
       public async void getJogadoresByTag()
       {
           _mock.Setup(x => x.getJogadoresByTag(It.IsAny<string>())).Returns(Task<List<JogadorDto>>.FromResult(listaDto));
           var result = await _controller.getJogadoresByTag("1");
           
           Assert.Equal(listaDto[0],result.Value.First());
       }
       
       
 

       [Fact]
       public async void HardDelete()
       {
           _mock.Setup(x => x.DeleteAsync(It.IsAny<JogadorId>())).Returns(Task<JogadorDto>.FromResult(_jogadorDto));
           var result = await _controller.HardDelete(_id);
           
           Assert.Equal(result.Value.Email,_jogadorDto.Email);
       }

       
       
       
       
       
       
        
        
    }
}