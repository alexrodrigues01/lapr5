using System;
using System.Collections.Generic;
using DDDSample1.Domain.Tags;

namespace DDDNetcore.Domain.Relacoes
{
    public class RelacaoDto
    {
        public Guid Id { get; set; }
        
        public string JogadorA { get; set; }
        
        public string JogadorB { get; set; }
        
        public string TagsRelacao { get;  set; }
        
        public List<TagidString> ListaTags { get; set; } 
        public int ForcaLigacao { get;  set; }
        
        public int ForcaRelacao { get;  set; }
        
        public string DataRelacao { get;  set; }
    }
}