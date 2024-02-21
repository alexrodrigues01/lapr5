using System;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Introducoes
{
    public class IntroducaoId: EntityId
    {
        public IntroducaoId(Guid value): base(value)
        {}
        
        public IntroducaoId(String value) : base(value)
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