using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Tags;
using Microsoft.EntityFrameworkCore;

namespace DDDSample1.Domain.Jogadores
{
    public interface IJogadorRepository : IRepository<Jogador,JogadorId>
    {
        /* public Task<List<Jogador>> getJogadoresByTag(TagidString tagid); */
        public Task<Jogador> getJogadorByNome(string descTag);
        public Task<Jogador> getJogadorByEmail(string descTag);
        public Task<Jogador> getJogadorByTelemovel(string descTag);
        
        public Task<List<Jogador>> getJogadoresByPais(string pais);
    }
}