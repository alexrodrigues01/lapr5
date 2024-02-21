using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using DDDNetcore.Domain.Relacoes;
using DDDNetCore.Domain.Relacoes;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Tags;
using DDDSample1.Utils;

namespace DDDSample1.Domain.PedidosLigacao
{
    public class PedidoLigacaoService : IPedidoLigacaoService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IPedidoLigacaoRepository _repo;
        private readonly IRelacaoRepository _repoRelacao;
        private readonly ITagRepository _tagRepo;

        public PedidoLigacaoService(IUnitOfWork unitOfWork, IPedidoLigacaoRepository repo, IRelacaoRepository repoRelacao,ITagRepository tagRepo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
            this._repoRelacao = repoRelacao;
            this._tagRepo = tagRepo;
        }
        
        public async Task<List<PedidoLigacaoDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();
            
            List<PedidoLigacaoDto> listDto = list.ConvertAll<PedidoLigacaoDto>(pedo => new PedidoLigacaoDto{Id = pedo.Id, jogadorInicio = pedo.jogadorInicio, jogadorObjetivo = pedo.jogadorObjetivo});

            return listDto;
        }

        public async Task<PedidoLigacaoDto> GetByIdAsync(PedidoLigacaoId id)
        {
            var pedo = await this._repo.GetByIdAsync(id);
            
            if(pedo == null)
                return null;

            return new PedidoLigacaoDto{Id = pedo.Id, jogadorInicio = pedo.jogadorInicio, jogadorObjetivo = pedo.jogadorObjetivo};
        }

        public async Task<PedidoLigacaoDto> AddAsync(CreatingPedidoLigacaoDto dto)
        {
            var pedo = new PedidoLigacao(new JogadorId(dto.jogadorInicio), new JogadorId(dto.jogadorObjetivo));

            await this._repo.AddAsync(pedo);

            await this._unitOfWork.CommitAsync();

            return new PedidoLigacaoDto { Id = pedo.Id, jogadorInicio = pedo.jogadorInicio, jogadorObjetivo = pedo.jogadorObjetivo};
        }
        
        public async Task<List<PedidoLigacaoDto>> AddAsync(Guid jogadorId , String jogadoresId)
        {
            string[] jogadores = jogadoresId.Split(',');
            List<PedidoLigacaoDto> lista = new List<PedidoLigacaoDto>();
            foreach (var jogador  in jogadores)
            {
                PedidoLigacao pedidoLigacao = new PedidoLigacao(new JogadorId(jogadorId),new JogadorId(jogador));
                await this._repo.AddAsync(pedidoLigacao);
                lista.Add(new PedidoLigacaoDto(){Id = pedidoLigacao.Id, jogadorInicio = pedidoLigacao.jogadorInicio, jogadorObjetivo = pedidoLigacao.jogadorObjetivo});
            }

            await this._unitOfWork.CommitAsync();

            return lista;
        }

        public async Task<PedidoLigacaoDto> UpdateAsync(PedidoLigacaoDto dto)
        {
            var pedo = await this._repo.GetByIdAsync(new PedidoLigacaoId(dto.Id)); 

            if (pedo == null)
                return null;   

            // change all field
            // category.ChangeDescription(dto.Description);
            
            await this._unitOfWork.CommitAsync();

            return new PedidoLigacaoDto { Id = pedo.Id, jogadorInicio = pedo.jogadorInicio, jogadorObjetivo = pedo.jogadorObjetivo};
        }

        public async Task<PedidoLigacaoDto> InactivateAsync(PedidoLigacaoId id)
        {
            var pedo = await this._repo.GetByIdAsync(id); 

            if (pedo == null)
                return null;   

            // change all fields
            // category.MarkAsInative();
            
            await this._unitOfWork.CommitAsync();

            return new PedidoLigacaoDto { Id = pedo.Id, jogadorInicio = pedo.jogadorInicio, jogadorObjetivo = pedo.jogadorObjetivo};
        }

        public async Task<RelacaoDto> DeleteAsync(PedidoLigacaoId id,string flag,CreatingRelacaoDto dto)
        {
            var pedo = await this._repo.GetByIdAsync(id); 

            if (pedo == null)
                return null;   

            /* if (pedo.Active)
                throw new BusinessRuleValidationException("It is not possible to delete an active category."); */
            
            this._repo.Remove(pedo);
            if (flag.Equals("1"))
            {
                List<TagidString> tagList = await TagUtils.getListaTags(dto.TagsRelacao, _tagRepo);
                var rel = new Relacao(pedo.jogadorInicio,pedo.jogadorObjetivo,tagList,dto.ForcaLigacao,dto.DataRelacao);

                await this._repoRelacao.AddAsync(rel);
                await this._unitOfWork.CommitAsync();
                return new RelacaoDto() { Id = rel.Id.AsGuid(), JogadorA = rel.JogadorA.AsString(), JogadorB = rel.JogadorB.AsString(), TagsRelacao = dto.TagsRelacao, ForcaLigacao = dto.ForcaLigacao, DataRelacao = dto.DataRelacao};
            }
            else
            {
                await this._unitOfWork.CommitAsync();
                return null;
            }
        }
        
        public async Task<PedidoLigacaoDto> DeleteAsync(PedidoLigacaoId id)
        {
            var pedo = await this._repo.GetByIdAsync(id); 
            
            if (pedo == null)
                return null;   
            
            /* if (pedo.Active)
                throw new BusinessRuleValidationException("It is not possible to delete an active category."); */
            
            this._repo.Remove(pedo);
            
            await this._unitOfWork.CommitAsync();

            return new PedidoLigacaoDto { Id = pedo.Id, jogadorInicio = pedo.jogadorInicio, jogadorObjetivo = pedo.jogadorObjetivo};
        }
        
        public async Task<List<PedidoLigacaoDto2>> getPedidosLigacaoPendentes(string idjogador)
        {
            var list = await this._repo.getPedidosLigacaoPendentes(new JogadorId(idjogador));
            
            List<PedidoLigacaoDto2> listDto = list.ConvertAll<PedidoLigacaoDto2>(pedo => new PedidoLigacaoDto2{Id = pedo.Id.AsGuid(), jogadorInicio = pedo.jogadorInicio.AsString(), jogadorObjetivo = pedo.jogadorObjetivo.AsString()});
            Console.WriteLine(listDto[0].Id);
            Console.WriteLine(listDto[0].jogadorInicio);
            return listDto;
        }
    }
}