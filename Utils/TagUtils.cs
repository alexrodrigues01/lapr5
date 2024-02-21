using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DDDSample1.Domain.Tags;

namespace DDDSample1.Utils
{
    public class TagUtils
    {
        public static async Task<List<TagidString>> getListaTags(string Tags1, ITagRepository _repo)
        {
            string[] tags = Tags1.Split(",");
            List<TagidString> listaTags = new List<TagidString>();
            foreach (string tagString in tags.Distinct().ToList())
            {
                var tag = tagString.Trim();

                var tagObj = await _repo.GetByStringAsync(tag);
                if (tagObj == null)
                {
                    Tag novaTag = new(tag);
                    await _repo.AddAsync(novaTag);
                    listaTags.Add(new TagidString(novaTag.Id.Value));
                }
                else
                {
                    listaTags.Add(new TagidString(tagObj.Id.Value));
                }
            }

            return listaTags;
        }
    }
}