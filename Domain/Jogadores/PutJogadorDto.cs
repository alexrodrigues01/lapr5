using System;

namespace DDDSample1.Domain.Jogadores
{
    public class PutJogadorDto
    {
        public Guid Id { get; set; }

        public string Nome { get; set; }

        public string Email{ get; set; }

        public string Telefone{ get; set; }
        
        public string Pais { get; set; }

        public string Rua { get; set; }

        public string Localidade { get; set; }

        public string CodigoPostal { get; set; }

        public string DataNascimento { get; set; }

        public string LinkedInLink { get; set; }

        public string FacebookLink { get; set; }

        public string InterestTags { get; set; }
        
        public string EstadoHumor { get; set; }

        public int Pontuacao { get; set; }
    }
}