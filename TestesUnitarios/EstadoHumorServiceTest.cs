using System.Collections.Generic;
using DDDNetCore.Domain.Relacoes;
using DDDSample1.Domain.EstadosHumor;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Tags;
using Moq;
using Xunit;

namespace DDDNetCore.TestesUnitariosDomain.EstadosHumor
{
    public class EstadoHumorServiceTest
    {
        private Mock<IUnitOfWork> _unit;
        private Mock <IEstadoHumorRepository> _estadoHumorRepo;
        private List<EstadoHumor> _jogadores;
        private List<EstadoHumorDto> listDto;
        private EstadoHumorService _estadoHumorService;

        public EstadoHumorServiceTest()
        {
            _unit = new Mock<IUnitOfWork>();
            _estadoHumorRepo= new Mock<IEstadoHumorRepository>();
            _estadoHumorService = new EstadoHumorService(_unit.Object,_estadoHumorRepo.Object);
        }

        [Fact]
        public void GetAllAsync()
        {
            
        }
        
        [Fact]
        public void UpdateAsync()
        {
            
        }
        
        [Fact]
        public void AddAsync()
        {
            
        }
        [Fact]
        public void DeleteAsync()
        {
            
        }
    }
}