using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DDDSample1.Domain.EstadosHumor;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.PedidosLigacao;
using DDDSample1.Domain.Shared;
using Microsoft.AspNetCore.Mvc;

namespace DDDSample1.Domain.Introducoes
{
    public class IntroducaoService : IIntroducaoService
    {
        private readonly IIntroducaoRepository _repo;
        private readonly IPedidoLigacaoRepository _pedidoRepo;
        private readonly IUnitOfWork _unitOfWork;
        
        public IntroducaoService(IUnitOfWork unitOfWork, IIntroducaoRepository repo,IPedidoLigacaoRepository pedidoRepo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
            this._pedidoRepo = pedidoRepo;
        }
        
        public async Task<List<IntroducaoDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();
            
            List<IntroducaoDto> listDto = list.ConvertAll<IntroducaoDto>(fam => new IntroducaoDto{Id = fam.Id.AsGuid(),MensagemIntroducaoIntermedio=fam.MensagemIntroducaoIntermedio.ToString(),MensagemIntroducaoObjetivo=fam.MensagemIntroducaoObjetivo.ToString(),JogadorInicio = fam.JogadorInicio.AsString(),JogadorIntermedio = fam.JogadorIntermedio.AsString(),JogadorObjetivo = fam.JogadorObjetivo.AsString()});
            
            return listDto;
        }
        public async Task<IntroducaoDto> AddAsync(CreatingIntroducaoDto dto)
        {

            Task<List<IntroducaoDto>> list = GetAllAsync();
            foreach (var var in list.Result)
            {
                
                Console.Write("\n\n\n\n\n\n\n\n\n"+var.JogadorInicio.ToString()+"-"+dto.JogadorInicio+"\n\n\n\n\n\n\n\n\n");
                if (var.JogadorInicio.ToString().Equals(dto.JogadorInicio) &&
                    var.JogadorIntermedio.ToString().Equals(dto.JogadorIntermedio) &&
                    var.JogadorObjetivo.ToString().Equals(dto.JogadorObjetivo))
                {
                    throw new BusinessRuleValidationException("Pedido criado anteriormente");
                }
            }

            var introducao = new Introducao(dto.MensagemIntroducaoIntermedio,dto.MensagemIntroducaoObjetivo,dto.JogadorInicio,dto.JogadorIntermedio,dto.JogadorObjetivo);

            await this._repo.AddAsync(introducao);

            await this._unitOfWork.CommitAsync();
            
            
            return new IntroducaoDto()
            {
                Id=introducao.Id.AsGuid(),
                MensagemIntroducaoIntermedio = introducao.MensagemIntroducaoIntermedio._MensagemIntroducao,MensagemIntroducaoObjetivo = introducao.MensagemIntroducaoObjetivo._MensagemIntroducao,
                JogadorIntermedio = introducao.JogadorIntermedio.AsString(),JogadorInicio = introducao.JogadorInicio.AsString(),JogadorObjetivo = introducao.JogadorObjetivo.AsString()
            };
        }
        
        public async Task<IntroducaoDto> GetByIdAsync(IntroducaoId id)
        {
            var introducao = await this._repo.GetByIdAsync(id);
            if (introducao == null)
                return null;
            return new IntroducaoDto()
            {
                Id=introducao.Id.AsGuid(),
                MensagemIntroducaoIntermedio = introducao.MensagemIntroducaoIntermedio._MensagemIntroducao,MensagemIntroducaoObjetivo = introducao.MensagemIntroducaoObjetivo._MensagemIntroducao,
                JogadorIntermedio = introducao.JogadorIntermedio.AsString(),JogadorInicio = introducao.JogadorInicio.AsString(),JogadorObjetivo = introducao.JogadorObjetivo.AsString()
            };
        }
        
        public async Task<List<IntroducaoDto>> GetIntroducoesByUser(String Userid)
        {
            List<Introducao> list = await this._repo.getIntroducoesByUser(new JogadorId(Userid));

            return list.ConvertAll<IntroducaoDto>(fam => new IntroducaoDto{Id = fam.Id.AsGuid(),MensagemIntroducaoIntermedio=fam.MensagemIntroducaoIntermedio.ToString(),MensagemIntroducaoObjetivo=fam.MensagemIntroducaoObjetivo.ToString(),JogadorInicio = fam.JogadorInicio.AsString(),JogadorIntermedio = fam.JogadorIntermedio.AsString(),JogadorObjetivo = fam.JogadorObjetivo.AsString()});
        }
        
        
        
        public async Task<PedidoLigacaoDto> DeleteAsync(IntroducaoId id,string flag)
        {
            var introducao = await this._repo.GetByIdAsync(id); 

            if (introducao == null)
                return null;   

           // if (introducao.Active)
             //   throw new BusinessRuleValidationException("Não é possível eliminar uma relação ativa.");
            
            this._repo.Remove(introducao);

           
            if (flag.Equals("1"))
            {
                var pedidoLigacao =
                    await _pedidoRepo.AddAsync(new PedidoLigacao(introducao.JogadorInicio, introducao.JogadorObjetivo));
                await this._unitOfWork.CommitAsync();
                return new PedidoLigacaoDto
                    {Id = pedidoLigacao.Id, jogadorInicio = pedidoLigacao.jogadorInicio, jogadorObjetivo = pedidoLigacao.jogadorObjetivo};
            }
            else
            {
                await this._unitOfWork.CommitAsync();
                return null;
            }
           

            
        }

    }
}