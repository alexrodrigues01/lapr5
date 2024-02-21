using System.Collections.Generic;
using System.Threading.Tasks;
using DDDNetcore.Domain.Relacoes;
using DDDNetcore.Domain.Tags;
using DDDSample1.Domain.Tags;

namespace DDDNetCore.Domain.Tags
{
    public interface ITagService
    {
        public Task<List<TagDto>> GetAllAsync();
        public Task<TagDto> getTagsByID(string tagID);
        public Task<TagDto> GetByIdAsync(TagId id);
    }
}