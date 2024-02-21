using DDDSample1.Domain.Introducoes;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DDDSample1.Infrastructure.Introducoes
{
    internal class IntroducaoEntityTypeConfiguration: IEntityTypeConfiguration<Introducao>
    {
        public void Configure(EntityTypeBuilder<Introducao> builder)
        {
            // cf. https://www.entityframeworktutorial.net/efcore/fluent-api-in-entity-framework-core.aspx
            
            //builder.ToTable("Categories", SchemaNames.DDDSample1);
            builder.HasKey(b => b.Id);
            //builder.Property<bool>("_active").HasColumnName("Active");
        }
    }
}