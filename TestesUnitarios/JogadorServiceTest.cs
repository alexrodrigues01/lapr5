using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DDDNetCore.Domain.Relacoes;
using DDDSample1.Domain.EstadosHumor;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Tags;
using DDDSample1.Infrastructure;
using Moq;
using Xunit;
using Xunit.Abstractions;

namespace DDDSample1.TestesUnitarios
{
    public class JogadorServiceTest
    {
        private Mock<IUnitOfWork> _unit;
        private Mock <IJogadorRepository>  _repo;
        private Mock <ITagRepository> _tagRepo;
        private Mock <IEstadoHumorRepository> _estadoHumorRepo;
        private Mock <IRelacaoRepository> _relacaoRepository;
        private List<Jogador> _jogadores;
        private List<JogadorDto> listDto;
        private Jogador _jogador;

        private JogadorService _jogadorService;



        public JogadorServiceTest()
        {
            _unit = new Mock<IUnitOfWork>();
            _repo = new Mock<IJogadorRepository>();
            _tagRepo = new Mock<ITagRepository>();
            _estadoHumorRepo = new Mock<IEstadoHumorRepository>();
            _relacaoRepository = new Mock<IRelacaoRepository>();
            _jogadorService = new JogadorService(_unit.Object, _repo.Object, _tagRepo.Object, _estadoHumorRepo.Object, _relacaoRepository.Object);
            _unit.Setup(x => x.CommitAsync()).Returns(Task.FromResult(1));
            
            TagidString tagidString1 = new TagidString("1");
            List<TagidString> listaTagids = new List<TagidString>();
            listaTagids.Add(tagidString1);
            String listaTagsString = "1";
            _jogador = new Jogador("Ruben", "ruben@gmail.com", "916963933", "Portugal", "Rua de cima", "Trofa",
                "4785-049", "21/03/2001", "link1", "link2", listaTagids, new EstadoHumorId(new Guid()));
            _jogadores = new List<Jogador>();
            _jogadores.Add(_jogador);
             listDto = _jogadores.ConvertAll<JogadorDto>(jogador => new JogadorDto{ Id = jogador.Id.AsGuid(), Nome = jogador.Nome._Nome,Email=jogador.Email._Email,Telefone=jogador.Telefone._Telefone,DataNascimento=jogador.DataNascimento._DataNascimento.ToString(),Pais = jogador.Morada._Pais.ToString(),Rua=jogador.Morada._Rua,Localidade = jogador.Morada._Localidade,CodigoPostal= jogador.Morada._CodigoPostal,LinkedInLink = jogador.LinkedInPerfil._LinkedInPerfil,FacebookLink = jogador.FacebookPerfil._FacebookPerfil,InterestTags = jogador.InterestTags,EstadoHumor = jogador.EstadoHumor.Value});
            
        }

        [Fact]
        public async void GetAllAsync()
        {
            _repo.Setup(x => x.GetAllAsync()).Returns(Task<List<Jogador>>.FromResult(_jogadores));
            var result= _jogadorService.GetAllAsync();
            Assert.Equal(listDto[0],result.Result[0]);
        }
        
        [Fact]
        public async void GetByIdAsync(){}

        [Fact]
        public async void AddAsync()
        {
           
        }

        [Fact]
        public async void UpdateAsync()
        {
            
        }
        [Fact]
        public async void getJogadorByTelemovel(){}
        
        [Fact]
        public async void getJogadorByEmail(){}
        
        [Fact]
        public async void getJogadorByNome(){}
        
        [Fact]
        public async void getJogadoresByPais(){}
        
        [Fact]
        public async void getJogadoresByTag(){}
        
        [Fact]
        public async void getJogadoresObjetivo(){}
        
        [Fact]
        public async void DeleteAsync(){}
        
    }
    
    
    
}