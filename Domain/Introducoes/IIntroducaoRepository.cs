using System.Collections.Generic;
using System.Threading.Tasks;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Introducoes
{
    public interface IIntroducaoRepository:IRepository<Introducao,IntroducaoId>
    {
        public Task<List<Introducao>> getIntroducoesByUser(JogadorId Userid);
    }
}