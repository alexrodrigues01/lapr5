using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DDDNetCore.Domain.Relacoes;
using DDDSample1.Controllers;
using DDDSample1.Domain.EstadosHumor;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Tags;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace DDDSample1.TestesUnitarios
{
    public class EstadosHumorControllerTest
    {
         private  Mock<IEstadoHumorService> _mock;

         private readonly Mock<IUnitOfWork> unitOfWork;

        private readonly Mock<IEstadoHumorRepository> _repo;

        private  EstadosHumorController _controller;

        private Guid _id;

        private JogadorId _jogadorId;

        private JogadorDto _jogadorDto;

        private CreatingJogadorDto _creatingJogadorDto;

        private List<EstadoHumorDto> listaDto;

        private CreatingEstadoHumorDto _creatingEstadoHumor;
        
        private EstadoHumorDto _estadoHumorDto;

        public EstadosHumorControllerTest()
        {
            
            listaDto = new List<EstadoHumorDto>();
            _mock = new Mock<IEstadoHumorService>();
            _controller = new EstadosHumorController(_mock.Object);
            // Jogador jogador = new Jogador("Ruben", "ruben@gmail.com", "916963933", "Portugal", "Rua de cima", "Trofa",
            //     "4785-049", "21/03/2001", "link1", "link2", listaTagids, new EstadoHumorId(new Guid()));
            // _creatingJogadorDto = new CreatingJogadorDto(jogador.Nome._Nome, jogador.Email._Email,
            //     jogador.Telefone._Telefone, jogador.Morada._Pais.ToString(), jogador.Morada._Rua.ToString(),
            //     jogador.Morada._Localidade.ToString(), jogador.Morada._CodigoPostal.ToString(),
            //     jogador.DataNascimento.ToString(), jogador.LinkedInPerfil._LinkedInPerfil,
            //     jogador.FacebookPerfil._FacebookPerfil, listaTagsString, "Joyful", "21/03/2001");
            // _jogadorDto= new JogadorDto{ Id = _jogadorId.AsGuid(), Nome = jogador.Nome._Nome,Email=jogador.Email._Email,Telefone=jogador.Telefone._Telefone,DataNascimento=jogador.DataNascimento._DataNascimento.ToString(),Pais = jogador.Morada._Pais.ToString(),Rua=jogador.Morada._Rua,Localidade = jogador.Morada._Localidade,CodigoPostal= jogador.Morada._CodigoPostal,LinkedInLink = jogador.LinkedInPerfil._LinkedInPerfil,FacebookLink = jogador.FacebookPerfil._FacebookPerfil,InterestTags = jogador.InterestTags,EstadoHumor = jogador.EstadoHumor.Value};
            // listaDto.Add(_jogadorDto);

            EstadoHumor estadoHumor = new EstadoHumor("Joyful","10/10/2015");
            _creatingEstadoHumor = new CreatingEstadoHumorDto(estadoHumor.Estado.ToString(),estadoHumor.DataEstadoHumor._DataEstadoHumor.ToString());
            _estadoHumorDto = new EstadoHumorDto(){Id=estadoHumor.Id.AsGuid(),Estado = estadoHumor.Estado.ToString(),DataEstadoHumor = estadoHumor.DataEstadoHumor._DataEstadoHumor.ToString()};
            listaDto.Add(_estadoHumorDto);
        }
        
        


        [Fact]
        public async void GetAll()
        {
            _mock.Setup(x => x.GetAllAsync()).Returns(Task<List<EstadoHumorDto>>.FromResult(listaDto));
           var result = await _controller.GetAll();
            Assert.Equal(listaDto[0],result.Value.First());
        }
        
        [Fact]
        public async void Create()
        {
            _mock.Setup(x => x.AddAsync(_creatingEstadoHumor)).Returns(Task<ActionResult<EstadoHumorDto>>.FromResult(_estadoHumorDto));
            var result = await _controller.Create(_creatingEstadoHumor);
            Assert.Equal(_estadoHumorDto.Id.ToString(),result.Value.Id.ToString());
        }
        
        [Fact]
        public async void Update()
        {
            _mock.Setup(x => x.UpdateAsync(_estadoHumorDto)).Returns(Task<ActionResult<EstadoHumorDto>>.FromResult(_estadoHumorDto));
            var result = await _controller.Update(_estadoHumorDto.Id,_estadoHumorDto);
            Assert.Equal(_estadoHumorDto.Id,result.Value.Id);
        }
        
        [Fact]
        public async void HardDelete()
        {
            _mock.Setup(x => x.DeleteAsync(new EstadoHumorId(_estadoHumorDto.Id))).Returns(Task<ActionResult<EstadoHumorDto>>.FromResult(_estadoHumorDto));
            var result = await _controller.HardDelete(_estadoHumorDto.Id.ToString());
            Assert.Equal(_estadoHumorDto.Id,result.Value.Id);
        }
        
       //  [Fact]
       //  public async void GetByID()
       //  {
       //      _mock.Setup(x => x.GetByIdAsync(new JogadorId(_id))).Returns(Task<JogadorDto>.FromResult(_jogadorDto));
       //      var result = await _controller.GetById(_id);
       //      Assert.Equal(result.Value.Email,_jogadorDto.Email);
       //  }
       //  
       //    [Fact]
       // public async void ReturnGetAll()
       // {
       //     _mock.Setup(x => x.GetAllAsync()).Returns(Task<List<JogadorDto>>.FromResult(listaDto));
       //     var result = await _controller.GetAll();
       //     
       //     Assert.Equal(listaDto[0],result.Value.First());
       // }
       //
       // [Fact]
       // public async void getJogadorBytelemovel()
       // {
       //     _mock.Setup(x => x.getJogadorByTelemovel(It.IsAny<string>())).Returns(Task<JogadorDto>.FromResult(_jogadorDto));
       //     var result = await _controller.getJogadorByTelemovel("916963933");
       //     
       //     Assert.Equal(result.Value.Email,_jogadorDto.Email);
       // }
       //  
        
    }
}