using System;
using DDDSample1.Domain.Shared;
using Newtonsoft.Json;

namespace DDDNetcore.Domain.Relacoes
{
    public class RelacaoId : EntityId
    {
        [JsonConstructor]
        public RelacaoId(Guid value) : base(value)
        {
        }

        public RelacaoId(String value) : base(value)
        {
        }

        override
            protected  Object createFromString(String text){
            return new Guid(text);
        }
        
        override
            public String AsString(){
            Guid obj = (Guid) base.ObjValue;
            return obj.ToString();
        }
        public Guid AsGuid(){
            return (Guid) base.ObjValue;
        }
    }
}