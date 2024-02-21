using DDDNetcore.Domain.Relacoes;
using DDDNetcore.Infraestructure.Relacoes;
using Microsoft.EntityFrameworkCore;
using DDDSample1.Domain.Categories;
using DDDSample1.Domain.EstadosHumor;
using DDDSample1.Domain.Products;
using DDDSample1.Domain.Families;
using DDDSample1.Domain.Introducoes;
using DDDSample1.Domain.PedidosLigacao;
using DDDSample1.Domain.Tags;
using DDDSample1.Infrastructure.Categories;
using DDDSample1.Infrastructure.EstadosHumor;
using DDDSample1.Infrastructure.Introducoes;
using DDDSample1.Infrastructure.Jogadores;
using DDDSample1.Infrastructure.PedidosLigacao;
using DDDSample1.Infrastructure.Products;

namespace DDDSample1.Infrastructure
{
    public class DDDSample1DbContext : DbContext
    {
        public DbSet<Category> Categories { get; set; }

        public DbSet<Product> Products { get; set; }

        public DbSet<Family> Families { get; set; }
        
        public DbSet<Jogador> Jogadores { get; set; }
        
        public DbSet<EstadoHumor> EstadosHumor { get; set; }
        
        public DbSet<Relacao> Relacoes { get; set; }
        
        public DbSet<Introducao> Introducoes { get; set; }
        
        public DbSet<Tag> Tags { get; set; }
        
        public DbSet<PedidoLigacao> PedidosLigacao { get; set; }
        public DDDSample1DbContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new CategoryEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new ProductEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new FamilyEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new JogadorEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new RelacaoEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new EstadoHumorEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new PedidoLigacaoEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new IntroducaoEntityTypeConfiguration());
        }
    }
}