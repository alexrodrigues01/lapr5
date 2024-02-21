using DDDNetcore.Domain.Relacoes;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DDDNetcore.Infraestructure.Relacoes
{
    public class RelacaoEntityTypeConfiguration: IEntityTypeConfiguration<Relacao>
    {
        public void Configure(EntityTypeBuilder<Relacao> builder)
        {
            builder.HasKey(b => b.Id);
            builder.OwnsOne(relacao => relacao.DataRelacao, dtrelacao => {
                dtrelacao.Property(p => p._DataRelacao).IsRequired();
            });
            builder.OwnsMany(relacao => relacao.TagsRelacao);
        }
    }
}