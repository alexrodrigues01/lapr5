using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DDDSample1.Controllers;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.Tags;
using DDDSample1.Infrastructure.Shared;
using Microsoft.EntityFrameworkCore;

namespace DDDSample1.Infrastructure.Jogadores
{
    public class JogadorRepository : BaseRepository<Jogador,JogadorId>, IJogadorRepository
    {
        public JogadorRepository(DDDSample1DbContext context):base(context.Jogadores)
        {
           
        }

        /* public Task<List<Jogador>> getJogadoresByTag(TagidString tagid)
        {
            return getContext().Where(jogador => jogador.InterestTags.Contains(tagid)).Distinct().ToListAsync();
        } */

        public async Task<Jogador> getJogadorByNome(string Nome)
        {
            return getContext().FirstOrDefault(x => Nome.Equals(x.Nome._Nome));
        }

        public async Task<Jogador> getJogadorByEmail(string Email)
        {
            return getContext().FirstOrDefault(x => Email.Equals(x.Email._Email));
        }

        public async Task<Jogador> getJogadorByTelemovel(string Telemovel)
        {
            return getContext().FirstOrDefault(x => Telemovel.Equals(x.Telefone._Telefone));
        }

        public Task<List<Jogador>> getJogadoresByPais(string pais)
        {
            return getContext().Where(jogador => jogador.Morada._Pais.Equals(pais)).ToListAsync();
        }
        
    }
}