using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DDDSample1.Infrastructure.Jogadores
{
    public class JogadorEntityTypeConfiguration: IEntityTypeConfiguration<Jogador>
    {
        public void Configure(EntityTypeBuilder<Jogador> builder)
        {
            builder.HasKey(b => b.Id);
            builder.OwnsOne(jogador => jogador.DataNascimento, dtnascimento => {
                dtnascimento.Property(p => p._DataNascimento).IsRequired();
            });
            builder.OwnsMany(jogador => jogador.InterestTags);
        }
    }
}