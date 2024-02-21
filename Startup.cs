
using DDDNetcore.Domain.Relacoes;
using DDDNetCore.Domain.Relacoes;
using DDDNetCore.Domain.Tags;
using DDDNetcore.Infraestructure.Relacoes;
using DDDSample1.ALGAV;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using DDDSample1.Infrastructure;
using DDDSample1.Infrastructure.Categories;
using DDDSample1.Infrastructure.Products;
using DDDSample1.Infrastructure.Families;
using DDDSample1.Infrastructure.Shared;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Categories;
using DDDSample1.Domain.EstadosHumor;
using DDDSample1.Domain.Products;
using DDDSample1.Domain.Families;
using DDDSample1.Domain.Introducoes;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.PedidosLigacao;
using DDDSample1.Domain.Tags;
using DDDSample1.Infrastructure.EstadosHumor;
using DDDSample1.Infrastructure.Introducoes;
using DDDSample1.Infrastructure.Jogadores;
using DDDSample1.Infrastructure.PedidosLigacao;
using DDDSample1.Infrastructure.Tags;

namespace DDDSample1
{
    public class Startup
    {
        private readonly string _policyName = "CorsPolicy";
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //services.AddCors();
            services.AddDbContext<DDDSample1DbContext>(opt =>
                opt.UseSqlServer("Password=8bCn6qiP5g==Xa5;Persist Security Info=True;User ID=sa;Initial Catalog=master;Data Source=vs417.dei.isep.ipp.pt;")
                .ReplaceService<IValueConverterSelector, StronglyEntityIdValueConverterSelector>());

            ConfigureMyServices(services);
            

            services.AddControllers().AddNewtonsoftJson();
            services.AddCors(opt =>
            {
                opt.AddPolicy(name: _policyName, builder =>
                {
                    builder.AllowAnyOrigin()
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseCors(_policyName);
           // app.UseCors(
          //      options => options.WithOrigins("http://localhost:4200").AllowAnyMethod()
           // );
            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
           
        }

        public void ConfigureMyServices(IServiceCollection services)
        {
            services.AddTransient<IUnitOfWork,UnitOfWork>();

            services.AddTransient<ICategoryRepository,CategoryRepository>();
            services.AddTransient<CategoryService>();

            services.AddTransient<IProductRepository,ProductRepository>();
            services.AddTransient<ProductService>();

            services.AddTransient<IFamilyRepository,FamilyRepository>();
            services.AddTransient<FamilyService>();
            
            services.AddTransient<IJogadorRepository,JogadorRepository>();
            services.AddTransient<IJogadorService,JogadorService>();
            
            services.AddTransient<IEstadoHumorRepository,EstadoHumorRepository>();
            services.AddTransient<IEstadoHumorService,EstadoHumorService>();

            services.AddTransient<IRelacaoRepository, RelacaoRepository>();
            services.AddTransient<IRelacaoService,RelacaoService>();
            
            services.AddTransient<ITagRepository, TagRepository>();
            services.AddTransient<ITagService,TagService>();
            
            services.AddTransient<IIntroducaoRepository,IntroducaoRepository>();
            services.AddTransient<IIntroducaoService,IntroducaoService>();

            services.AddTransient<IPedidoLigacaoRepository, PedidoLigacaoRepository>();
            services.AddTransient<IPedidoLigacaoService, PedidoLigacaoService>();

            services.AddTransient<IIA,HttpProlog>();
        }
    }
}
