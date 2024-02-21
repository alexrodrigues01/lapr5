using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using DDDNetcore.Domain.Relacoes;
using DDDNetCore.Domain.Relacoes;
using DDDSample1.Domain.Categories;
using DDDSample1.Domain.EstadosHumor;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Tags;
using DDDSample1.Infrastructure.Tags;
using DDDSample1.Utils;


namespace DDDSample1.Domain.Jogadores
{
    public class JogadorService : IJogadorService
    {
        private readonly IUnitOfWork _unitOfWork;
        
        private readonly IJogadorRepository _repo;
        private readonly ITagRepository _tagRepo;
        private readonly IEstadoHumorRepository _estadoHumorRepo;
        private readonly IRelacaoRepository _relacaoRepository;

        public JogadorService(IUnitOfWork unitOfWork, IJogadorRepository repo, ITagRepository tagRepo,IEstadoHumorRepository estadoHumorRepo, IRelacaoRepository relacaoRepository)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
            this._tagRepo = tagRepo;
            this._estadoHumorRepo = estadoHumorRepo;
            this._relacaoRepository = relacaoRepository;
        }
        public async Task<List<JogadorDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();
            
            List<JogadorDto> listDto = list.ConvertAll<JogadorDto>(jogador => new JogadorDto{ Id = jogador.Id.AsGuid(), Nome = jogador.Nome._Nome,Email=jogador.Email._Email,Telefone=jogador.Telefone._Telefone,DataNascimento=jogador.DataNascimento._DataNascimento.ToString(),Pais = jogador.Morada._Pais.ToString(),Rua=jogador.Morada._Rua,Localidade = jogador.Morada._Localidade,CodigoPostal= jogador.Morada._CodigoPostal,LinkedInLink = jogador.LinkedInPerfil._LinkedInPerfil,FacebookLink = jogador.FacebookPerfil._FacebookPerfil,InterestTags = jogador.InterestTags,EstadoHumor = jogador.EstadoHumor.Value});

            return listDto;
        }

        public async Task<JogadorDto> GetByIdAsync(JogadorId id)
        {
            var jogador = await this._repo.GetByIdAsync(id);
            if (jogador == null)
                return null;
            return new JogadorDto() { Id = jogador.Id.AsGuid(), Nome = jogador.Nome._Nome,Email=jogador.Email._Email,Telefone=jogador.Telefone._Telefone,DataNascimento=jogador.DataNascimento._DataNascimento.ToString(),Pais = jogador.Morada._Pais.ToString(),Rua=jogador.Morada._Rua,Localidade = jogador.Morada._Localidade,CodigoPostal= jogador.Morada._CodigoPostal,LinkedInLink = jogador.LinkedInPerfil._LinkedInPerfil,FacebookLink = jogador.FacebookPerfil._FacebookPerfil,InterestTags = jogador.InterestTags,EstadoHumor = jogador.EstadoHumor.Value};
        }
        
        public async Task<JogadorDto> AddAsync(CreatingJogadorDto dto)
        {
            var estadoHumor = new EstadoHumor(dto.Estado,dto.DataEstadoHumor);
            await this._estadoHumorRepo.AddAsync(estadoHumor);

            List<TagidString> tagList = await TagUtils.getListaTags(dto.InterestTags, _tagRepo);
            
            var jogador = new Jogador(dto.Nome,dto.Email,dto.Telefone,dto.Pais,dto.Rua,dto.Localidade,dto.CodigoPostal,dto.DataNascimento,dto.LinkedInLink,dto.FacebookLink,tagList,estadoHumor.Id);

            await this._repo.AddAsync(jogador);

            await this._unitOfWork.CommitAsync();

            return new JogadorDto() { Id = jogador.Id.AsGuid(), Nome = jogador.Nome._Nome,Email=jogador.Email._Email,Telefone=jogador.Telefone._Telefone,DataNascimento=jogador.DataNascimento._DataNascimento.ToString(),Pais = jogador.Morada._Pais.ToString(),Rua=jogador.Morada._Rua,Localidade = jogador.Morada._Localidade,CodigoPostal= jogador.Morada._CodigoPostal,LinkedInLink = jogador.LinkedInPerfil._LinkedInPerfil,FacebookLink = jogador.FacebookPerfil._FacebookPerfil,InterestTags = jogador.InterestTags,EstadoHumor = jogador.EstadoHumor.Value};
        }

        public async Task<JogadorDto> UpdateAsync(PutJogadorDto putdto)
        {
            var jog = await this._repo.GetByIdAsync(new JogadorId(putdto.Id)); 

            if (jog == null)
                return null;

            JogadorDto dto =new JogadorDto { Id = putdto.Id, Nome = putdto.Nome,Email=putdto.Email,Telefone=putdto.Telefone,DataNascimento=putdto.DataNascimento.ToString(),Pais = putdto.Pais.ToString(),Rua=putdto.Rua,Localidade = putdto.Localidade,CodigoPostal= putdto.CodigoPostal,LinkedInLink = putdto.LinkedInLink,FacebookLink = putdto.FacebookLink,InterestTags = await TagUtils.getListaTags(putdto.InterestTags,_tagRepo),EstadoHumor = putdto.EstadoHumor };

            // change all field
            jog.changeFields(dto);
            
            await this._unitOfWork.CommitAsync();

            return new JogadorDto { Id = jog.Id.AsGuid(), Nome = jog.Nome._Nome,Email=jog.Email._Email,Telefone=jog.Telefone._Telefone,DataNascimento=jog.DataNascimento._DataNascimento.ToString(),Pais = jog.Morada._Pais.ToString(),Rua=jog.Morada._Rua,Localidade = jog.Morada._Localidade,CodigoPostal= jog.Morada._CodigoPostal,LinkedInLink = jog.LinkedInPerfil._LinkedInPerfil,FacebookLink = jog.FacebookPerfil._FacebookPerfil,InterestTags = jog.InterestTags,EstadoHumor = jog.EstadoHumor.Value };
        }
        public async Task<JogadorDto> getJogadorByTelemovel(String telemovel)
        {
            var jogador =  await this._repo.getJogadorByTelemovel(telemovel);

            return new JogadorDto{Id = jogador.Id.AsGuid(), Nome = jogador.Nome._Nome,Email=jogador.Email._Email,Telefone=jogador.Telefone._Telefone,DataNascimento=jogador.DataNascimento._DataNascimento.ToString(),Pais = jogador.Morada._Pais.ToString(),Rua=jogador.Morada._Rua,Localidade = jogador.Morada._Localidade,CodigoPostal= jogador.Morada._CodigoPostal,LinkedInLink = jogador.LinkedInPerfil._LinkedInPerfil,FacebookLink = jogador.FacebookPerfil._FacebookPerfil,InterestTags = jogador.InterestTags,EstadoHumor = jogador.EstadoHumor.Value};
        }
        
        public async Task<JogadorDto> getJogadorByEmail(String email)
        {
            var jogador =  await this._repo.getJogadorByEmail(email);

            return new JogadorDto{Id = jogador.Id.AsGuid(), Nome = jogador.Nome._Nome,Email=jogador.Email._Email,Telefone=jogador.Telefone._Telefone,DataNascimento=jogador.DataNascimento._DataNascimento.ToString(),Pais = jogador.Morada._Pais.ToString(),Rua=jogador.Morada._Rua,Localidade = jogador.Morada._Localidade,CodigoPostal= jogador.Morada._CodigoPostal,LinkedInLink = jogador.LinkedInPerfil._LinkedInPerfil,FacebookLink = jogador.FacebookPerfil._FacebookPerfil,InterestTags = jogador.InterestTags,EstadoHumor = jogador.EstadoHumor.Value};
        }
        
        public async Task<JogadorDto> getJogadorByNome(String nome)
        {
            var jogador =  await this._repo.getJogadorByNome(nome);

            return new JogadorDto{Id = jogador.Id.AsGuid(), Nome = jogador.Nome._Nome,Email=jogador.Email._Email,Telefone=jogador.Telefone._Telefone,DataNascimento=jogador.DataNascimento._DataNascimento.ToString(),Pais = jogador.Morada._Pais.ToString(),Rua=jogador.Morada._Rua,Localidade = jogador.Morada._Localidade,CodigoPostal= jogador.Morada._CodigoPostal,LinkedInLink = jogador.LinkedInPerfil._LinkedInPerfil,FacebookLink = jogador.FacebookPerfil._FacebookPerfil,InterestTags = jogador.InterestTags,EstadoHumor = jogador.EstadoHumor.Value};
        }

        public async Task<List<JogadorDto>> getJogadoresByPais(String pais)
        {
            List<Jogador> list = await this._repo.getJogadoresByPais(pais);
            
            return list.ConvertAll<JogadorDto>(jogador => new JogadorDto{Id = jogador.Id.AsGuid(), Nome = jogador.Nome._Nome,Email=jogador.Email._Email,Telefone=jogador.Telefone._Telefone,DataNascimento=jogador.DataNascimento._DataNascimento.ToString(),Pais = jogador.Morada._Pais.ToString(),Rua=jogador.Morada._Rua,Localidade = jogador.Morada._Localidade,CodigoPostal= jogador.Morada._CodigoPostal,LinkedInLink = jogador.LinkedInPerfil._LinkedInPerfil,FacebookLink = jogador.FacebookPerfil._FacebookPerfil,InterestTags = jogador.InterestTags,EstadoHumor = jogador.EstadoHumor.Value});
        }

        public async Task<List<JogadorDto>> getJogadoresByTag(string tagString)
        {
            Tag tag = await this._tagRepo.GetByStringAsync(tagString);
            
            List<Jogador> list = await this._repo.GetAllAsync();

            List<Jogador> newList = new List<Jogador>();

            foreach (Jogador jog in list)
            {
                foreach (TagidString t in jog.InterestTags)
                {
                    if (t.tagid.Equals(tag.Id.Value))
                    {
                        newList.Add(jog);
                    }
                }
            }
            
            return newList.ConvertAll<JogadorDto>(jogador => new JogadorDto{Id = jogador.Id.AsGuid(), Nome = jogador.Nome._Nome,Email=jogador.Email._Email,Telefone=jogador.Telefone._Telefone,DataNascimento=jogador.DataNascimento._DataNascimento.ToString(),Pais = jogador.Morada._Pais.ToString(),Rua=jogador.Morada._Rua,Localidade = jogador.Morada._Localidade,CodigoPostal= jogador.Morada._CodigoPostal,LinkedInLink = jogador.LinkedInPerfil._LinkedInPerfil,FacebookLink = jogador.FacebookPerfil._FacebookPerfil,InterestTags = jogador.InterestTags,EstadoHumor = jogador.EstadoHumor.Value});

        }

        public async Task<List<JogadorDto>> getJogadoresObjetivo(string id)
        {
            var jogador = await this._repo.GetByIdAsync(new JogadorId(id));
            var list = await this._repo.GetAllAsync();
            List<JogadorDto> listaJogadores = new List<JogadorDto>();
            foreach (var jog in list)
            {
                if (!jog.Id.Equals(jogador.Id))
                {
                    foreach (var tag in jog.InterestTags)
                    {
                        if (jogador.InterestTags.Contains(tag))
                        {
                            listaJogadores.Add( new JogadorDto() { Id = jog.Id.AsGuid(), Nome = jog.Nome._Nome,Email=jog.Email._Email,Telefone=jog.Telefone._Telefone,DataNascimento=jog.DataNascimento._DataNascimento.ToString(),Pais = jog.Morada._Pais.ToString(),Rua=jog.Morada._Rua,Localidade = jog.Morada._Localidade,CodigoPostal= jog.Morada._CodigoPostal,LinkedInLink = jog.LinkedInPerfil._LinkedInPerfil,FacebookLink = jog.FacebookPerfil._FacebookPerfil,InterestTags = jog.InterestTags,EstadoHumor = jog.EstadoHumor.Value});
                            break;
                        }
                    }
                }
            }
            return listaJogadores;
        }
        
        public async Task<JogadorDto> DeleteAsync(JogadorId id)
        {
            var jogador = await this._repo.GetByIdAsync(id); 

            if (jogador == null)
                return null;   

          //  if (jogador.Active)
            //    throw new BusinessRuleValidationException("It is not possible to delete an active family.");
            
            this._repo.Remove(jogador);
            await this._unitOfWork.CommitAsync();

            return new JogadorDto() { Id = jogador.Id.AsGuid(), Nome = jogador.Nome._Nome,Email=jogador.Email._Email,Telefone=jogador.Telefone._Telefone,DataNascimento=jogador.DataNascimento._DataNascimento.ToString(),Pais = jogador.Morada._Pais.ToString(),Rua=jogador.Morada._Rua,Localidade = jogador.Morada._Localidade,CodigoPostal= jogador.Morada._CodigoPostal,LinkedInLink = jogador.LinkedInPerfil._LinkedInPerfil,FacebookLink = jogador.FacebookPerfil._FacebookPerfil,InterestTags = jogador.InterestTags,EstadoHumor = jogador.EstadoHumor.Value};
        }

     


        /* public async Task<List<JogadorDto>> getJogadoresByTags(string tagString)
        {
            Tag tag = await this._tagRepo.GetByStringAsync(tagString);

            TagidString tagidString = new TagidString(tag.Id.Value);
            
            sou uma linha de codigo comentada

            List<Jogador> list = await this._repo.getJogadoresByTag(tagidString);

            return list.ConvertAll<JogadorDto>(jogador => new JogadorDto
            {
                Id = jogador.Id.AsGuid(), Nome = jogador.Nome._Nome, Email = jogador.Email._Email,
                Telefone = jogador.Telefone._Telefone,
                DataNascimento = jogador.DataNascimento._DataNascimento.ToString(), Rua = jogador.Morada._Rua,
                Localidade = jogador.Morada._Localidade, CodigoPostal = jogador.Morada._CodigoPostal
            });
        } */
        
    }
}