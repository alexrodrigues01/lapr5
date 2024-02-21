using System;
using System.Collections.Generic;
using DDDSample1.Domain.EstadosHumor;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Tags;
using DDDSample1.Utils;
using Microsoft.AspNetCore.Identity;



public class Jogador : Entity<JogadorId>, IAggregateRoot
{
    public Nome Nome { get; private set; }
    
    public Email Email { get; private set; }
    public Telefone Telefone { get; private set; }
    public Morada Morada { get; private set; }
    
    public Pontuacao Pontuacao { get; private set; }
    
    public DataNascimento DataNascimento { get; private set; }
    
    public LinkedInPerfil LinkedInPerfil { get; private set; }
    
    public FacebookPerfil FacebookPerfil { get; private set; }
    
    public EstadoHumorId EstadoHumor { get; private set; }
    
    public List<TagidString> InterestTags { get; private set; }
    public bool Active{ get;  private set; }

    private Jogador()
        
    {
        this.Active = true;
    }

    public Jogador(string Nome, string Email, string Telefone,string Pais, string Rua, string Localidade, string CodigoPostal,string DataNascimento, string LinkedInLink, string FacebookLink,List<TagidString> interestTags,EstadoHumorId estadoHumorId)
    {
        this.Id = new JogadorId(Guid.NewGuid());
        this.Nome = new Nome(Nome);
        this.Email = new Email(Email);
        this.Telefone = new Telefone(Telefone);
        this.Morada = new Morada(Pais,Rua, Localidade, CodigoPostal);
        this.DataNascimento = new DataNascimento(DataNascimento);
        this.LinkedInPerfil = new LinkedInPerfil(LinkedInLink);
        this.FacebookPerfil = new FacebookPerfil(FacebookLink);
        this.Pontuacao = new Pontuacao(0);
        this.Active = true;

         if (interestTags == null && interestTags.Count < 1 && interestTags.Count > 5 )
         {
            throw new BusinessRuleValidationException("Jogador precisa de ter entre 1 a 5 tags de interesse");
         }
         else
         {
             InterestTags = new List<TagidString>();
            for (int i = 0; i < interestTags.Count; i++)
            {
                InterestTags.Add( interestTags[i]);
             }
        
         }

         this.EstadoHumor = estadoHumorId;




    }
    

    public void changeFields(JogadorDto dto)
    {
        if (!this.Active)
        {
            throw new BusinessRuleValidationException("Não é possível alterar dados de um jogador inativo.");
        }

        this.Email = new Email(dto.Email);
        this.Morada = new Morada(dto.Pais,dto.Rua, dto.Localidade, dto.CodigoPostal);
        this.Nome = new Nome(dto.Nome);
        this.Telefone = new Telefone(dto.Telefone);
        this.DataNascimento = new DataNascimento(dto.DataNascimento);
        this.LinkedInPerfil = new LinkedInPerfil(dto.LinkedInLink);
        this.FacebookPerfil = new FacebookPerfil(dto.FacebookLink);
        this.Pontuacao = new Pontuacao(dto.Pontuacao);

    }

    public void MarkAsInative()
    {
        this.Active = false;
    }


}