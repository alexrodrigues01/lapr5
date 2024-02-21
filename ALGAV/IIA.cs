using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DDDNetcore.Domain.Relacoes;
using DDDSample1.Domain.Jogadores;

namespace DDDSample1.ALGAV
{
    public interface IIA
    {
        Task<String> boot(List<JogadorDto> utilizadores, List<RelacaoDto> relacionamentos);
        Task<String> adicionarUtilizador(JogadorDto dto);
        Task<String> adicionarRelacionamento(RelacaoDto dto);
        Task<String> URL();
    }
}