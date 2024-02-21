using System;
using System.Collections.Generic;
using DDDSample1.Domain.EstadosHumor;
using DDDSample1.Domain.Tags;

namespace DDDSample1.Domain.Jogadores
{
    public class JogadorDto
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

        public List<TagidString> InterestTags { get; set; }
        
        public string EstadoHumor { get; set; }

        public string DataEstadoHumor { get; set; }

        public int Pontuacao { get; set; }

        public override bool Equals(object? o)
        {
            if (o == null)
            {
                return false;
            }
            JogadorDto dto = o as JogadorDto;

            return dto != null && this.Id.Equals(dto.Id);
        }

        public override int GetHashCode()
        {
            return this.Id.GetHashCode();
        }

    }
}