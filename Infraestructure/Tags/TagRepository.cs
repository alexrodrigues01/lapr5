using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DDDNetcore.Domain.Tags;
using DDDSample1.Domain.Tags;
using DDDSample1.Infrastructure.Shared;

namespace DDDSample1.Infrastructure.Tags
{
    public class TagRepository : BaseRepository<Tag,TagId>,ITagRepository
    {
        public TagRepository(DDDSample1DbContext context) : base(context.Tags)
        {
            
        }


        public async Task<Tag> GetByStringAsync(string tag)
        {
            return this._objs.FirstOrDefault(x => tag.Equals(x.Descricao._Descricao));
           
        }

        public async Task<Tag> GetTagByID(string tagId)
        
        {
            return this._objs.FirstOrDefault(x => tagId.Equals(x.Id.Value));
           
        }
        
       
    }
}