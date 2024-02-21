using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DDDSample1.Domain.Introducoes;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Infrastructure.Shared;
using Microsoft.EntityFrameworkCore;

namespace DDDSample1.Infrastructure.Introducoes
{
    public class IntroducaoRepository : BaseRepository<Introducao, IntroducaoId>, IIntroducaoRepository
    {
        private IIntroducaoRepository _introducaoRepositoryImplementation;

        public IntroducaoRepository(DDDSample1DbContext context):base(context.Introducoes)
        {
           
        }

        public Task<List<Introducao>> getIntroducoesByUser(JogadorId Userid)
        {
            return getContext().Where(introducao=>introducao.JogadorIntermedio.Equals(Userid)).ToListAsync();
        }
    }
}