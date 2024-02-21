using DDDSample1.Domain.EstadosHumor;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DDDSample1.Infrastructure.EstadosHumor
{

    public class EstadoHumorEntityTypeConfiguration: IEntityTypeConfiguration<EstadoHumor>
    {
        public void Configure(EntityTypeBuilder<EstadoHumor> builder)
        {
            builder.HasKey(b => b.Id);
            builder.OwnsOne(estadoHumor => estadoHumor.DataEstadoHumor, dataEstadoHumor => {
                dataEstadoHumor.Property(p => p._DataEstadoHumor).IsRequired();
            });
            
        }
    }
}