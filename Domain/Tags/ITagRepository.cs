using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DDDNetcore.Domain.Relacoes;
using DDDNetcore.Domain.Tags;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Tags
{
    public interface ITagRepository : IRepository<Tag,TagId>
    {
        public Task<Tag> GetByStringAsync(string tag);
        public Task<Tag> GetTagByID(string tagId);
    }
}