using System;
using System.Collections.Generic;
using DDDSample1.Domain.Tags;
using Microsoft.AspNetCore.Mvc;


namespace DDDSample1.Domain.Jogadores
{
    public class CreatingJogadorDto
    {
        public string Nome;

       // public string Password;

        public string Email;

        public string Telefone;

        public string Pais;
        
        public string Rua;

        public string Localidade;

        public string CodigoPostal;

        public string DataNascimento;

        public string LinkedInLink;

        public string FacebookLink;

        public string InterestTags;

        public string Estado;

        public string DataEstadoHumor;


        public CreatingJogadorDto(string Nome, string Email, string Telefone,string Pais, string Rua, string Localidade, string CodigoPostal, string DataNascimento, string LinkedInLink, string FacebookLink, string interestTags,string EstadoHumor, string dataEstadoHumor)
        {
            this.Nome = Nome;
            this.Email = Email;
            this.Telefone = Telefone;
            this.Pais = Pais;
            this.Rua = Rua;
            this.Localidade = Localidade;
            this.CodigoPostal = CodigoPostal;
            this.DataNascimento = DataNascimento;
            this.LinkedInLink = LinkedInLink;
            this.FacebookLink = FacebookLink;
            this.InterestTags = interestTags;
            this.Estado = EstadoHumor;
            this.DataEstadoHumor = dataEstadoHumor;
        }
        
     /*   public CreatingJogadorDto(string Nome,string Passowrd, string Email, string Telefone,string Pais, string Rua, string Localidade, string CodigoPostal, string DataNascimento, string LinkedInLink, string FacebookLink, string interestTags,string EstadoHumor, string dataEstadoHumor)
        {
            this.Nome = Nome;
            this.Password = Passowrd;
            this.Email = Email;
            this.Telefone = Telefone;
            this.Pais = Pais;
            this.Rua = Rua;
            this.Localidade = Localidade;
            this.CodigoPostal = CodigoPostal;
            this.DataNascimento = DataNascimento;
            this.LinkedInLink = LinkedInLink;
            this.FacebookLink = FacebookLink;
            this.InterestTags = interestTags;
            this.Estado = EstadoHumor;
            this.DataEstadoHumor = dataEstadoHumor;
        } */
        }
    }
