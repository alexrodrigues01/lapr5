using System;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Tags
{
    public class TagidString : IEquatable<TagidString>
    {

        public string tagid
        {
            get;
            private set;
        }

        public JogadorId jogadorid
        {
            get;
            private set;
        }

        public Guid Id
        {
            get;
            private set;
        }

        public TagidString(string tagid)
        {
            this.tagid = tagid;
        }

        private TagidString()
        {
        }

        public bool Equals(TagidString tagx)
        {
            return this.tagid.Equals(tagx.tagid);
        }
    }
}