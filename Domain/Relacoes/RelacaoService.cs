using System.Threading.Tasks;
using System.Collections.Generic;
using System.Text;
using DDDNetCore.Domain.Relacoes;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Tags;
using DDDSample1.Utils;

namespace DDDNetcore.Domain.Relacoes
{
    public class RelacaoService : IRelacaoService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRelacaoRepository _repo;
        private readonly ITagRepository _tagRepo;
        
        public RelacaoService(IUnitOfWork unitOfWork, IRelacaoRepository repo, ITagRepository tagRepo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
            this._tagRepo = tagRepo;
        }

        public async Task<List<RelacaoDto>> GetAllAsync()
        { 
            var list = await this._repo.GetAllAsync();
            
        
            
            List<RelacaoDto> listDto = list.ConvertAll<RelacaoDto>(rel =>
                new RelacaoDto()
                {
                    Id = rel.Id.AsGuid(), JogadorA = rel.JogadorA.AsString(), JogadorB = rel.JogadorB.AsString(),
                    ForcaLigacao = rel.ForcaLigacao._ForcaLigacao, DataRelacao = rel.DataRelacao._DataRelacao.ToString(),ListaTags = rel.TagsRelacao
                });

            return listDto;
        }

        public async Task<RelacaoDto> GetByIdAsync(RelacaoId id)
        {
            var rel = await this._repo.GetByIdAsync(id);
            
            if(rel == null)
                return null;

            return new RelacaoDto(){Id = rel.Id.AsGuid(), JogadorA = rel.JogadorA.AsString(), JogadorB = rel.JogadorB.AsString(),ForcaLigacao = rel.ForcaLigacao._ForcaLigacao, DataRelacao = rel.DataRelacao._DataRelacao.ToString()};
        }

        /*public async Task<RelacaoDto> AddAsync(CreatingRelacaoDto dto)
        {
            List<TagidString> tagList = await TagUtils.getListaTags(dto.TagsRelacao, _tagRepo);
            var rel = new Relacao(dto.JogadorA,dto.JogadorB,tagList,dto.ForcaLigacao,dto.DataRelacao);

            await this._repo.AddAsync(rel);

            await this._unitOfWork.CommitAsync();

            return new RelacaoDto(){Id = rel.Id.AsGuid(), JogadorA = rel.JogadorA.AsString(), JogadorB = rel.JogadorB.AsString(), TagsRelacao = dto.TagsRelacao,ForcaLigacao = rel.ForcaLigacao._ForcaLigacao, DataRelacao = rel.DataRelacao._DataRelacao.ToString()};
        }*/

        public async Task<RelacaoDto> UpdateAsync(RelacaoDto dto)
        {
            var rel = await this._repo.GetByIdAsync(new RelacaoId(dto.Id)); 

            if (rel == null)
                return null;   
            
            List<TagidString> tagList = await TagUtils.getListaTags(dto.TagsRelacao, _tagRepo);
            // change all fields
            rel.ChangeForcaLigacao(dto.ForcaLigacao);
            rel.ChangeForcaRelacao(dto.ForcaRelacao);
            rel.ChangeTags(tagList);
            
            await this._unitOfWork.CommitAsync();

            return new RelacaoDto(){Id = rel.Id.AsGuid(), JogadorA = rel.JogadorA.AsString(), JogadorB = rel.JogadorB.AsString(), TagsRelacao = dto.TagsRelacao,ForcaLigacao = rel.ForcaLigacao._ForcaLigacao, ForcaRelacao = rel.ForcaRelacao._ForcaRelacao,DataRelacao = rel.DataRelacao._DataRelacao.ToString()};
        }

        /*public async Task<RelacaoDto> InactivateAsync(RelacaoId id)
        {
            var rel = await this._repo.GetByIdAsync(id); 

            if (rel == null)
                return null;   

            rel.MarkAsInative();
            
            await this._unitOfWork.CommitAsync();

            return new RelacaoDto(){Id = rel.Id.AsGuid(), JogadorA = rel.JogadorA.AsString(), JogadorB = rel.JogadorB.AsString(),ForcaLigacao = rel.ForcaLigacao._ForcaLigacao, DataRelacao = rel.DataRelacao._DataRelacao.ToString()};
        }*/

        public async Task<RelacaoDto> DeleteAsync(RelacaoId id)
        {
            var rel = await this._repo.GetByIdAsync(id); 

            if (rel == null)
                return null;   

            /*if (rel.Active)
                throw new BusinessRuleValidationException("Não é possível eliminar uma relação ativa.");*/
            
            this._repo.Remove(rel);
            await this._unitOfWork.CommitAsync();

            return new RelacaoDto(){Id = rel.Id.AsGuid(), JogadorA = rel.JogadorA.AsString(), JogadorB = rel.JogadorB.AsString(),ForcaLigacao = rel.ForcaLigacao._ForcaLigacao, DataRelacao = rel.DataRelacao._DataRelacao.ToString()};
        }

        public async Task<List<RelacaoDto>> getRelacoes(JogadorId jogadorId)
        {
            var list = await _repo.getRelacoes(jogadorId);
            
            List<RelacaoDto> listDto = list.ConvertAll<RelacaoDto>(rel =>
                new RelacaoDto()
                {
                    Id = rel.Id.AsGuid(), JogadorA = rel.JogadorA.AsString(), JogadorB = rel.JogadorB.AsString(),
                    ForcaLigacao = rel.ForcaLigacao._ForcaLigacao, ForcaRelacao = rel.ForcaRelacao._ForcaRelacao,DataRelacao = rel.DataRelacao._DataRelacao.ToString(),
                    TagsRelacao =  getTagsString(rel.TagsRelacao), ListaTags = rel.TagsRelacao
                });
            
            return listDto;
        }

        private string getTagsString(List<TagidString> a)
        {
            StringBuilder stringBuilder = new StringBuilder();
            int tamanho = a.Count;
            foreach (var tag in a)
            {
                if (a.IndexOf(tag) == tamanho-1)
                {
                    stringBuilder.Append(tag.tagid);
                }
                else
                {
                    stringBuilder.Append(tag.tagid + ",");
                }
            }

            return stringBuilder.ToString();
        }
    }
}