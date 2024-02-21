using DDDSample1.Domain.PedidosLigacao;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DDDSample1.Infrastructure.PedidosLigacao
{
    public class PedidoLigacaoEntityTypeConfiguration : IEntityTypeConfiguration<PedidoLigacao>
    {
        public void Configure(EntityTypeBuilder<PedidoLigacao> builder)
        {
            builder.HasKey(b => b.Id);
        }
    }
}