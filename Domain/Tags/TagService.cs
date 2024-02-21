using System.Collections.Generic;
using System.Threading.Tasks;
using DDDNetcore.Domain.Tags;
using DDDNetCore.Domain.Tags;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Tags
{
    public class TagService : ITagService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ITagRepository _repo;

        public TagService(IUnitOfWork unitOfWork, ITagRepository repo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
        }


        public async Task<List<TagDto>> GetAllAsync()
        {
            var tags = await this._repo.GetAllAsync();
            List<TagDto> listDto = tags.ConvertAll<TagDto>(tag => new TagDto
                {Id = tag.Id.AsGuid(), Descricao = tag.Descricao._Descricao});
            return listDto;
        }

        public async Task<TagDto> getTagsByID(string tagID)
        {
            var rel = await this._repo.GetByIdAsync(new TagId(tagID));
            
            if(rel == null)
                return null;

            return new TagDto() {Id = rel.Id.AsGuid(), Descricao = rel.Descricao._Descricao};
           
        }

        public Task<TagDto> GetByIdAsync(TagId id)
        {
            throw new System.NotImplementedException();
        }
    }
}