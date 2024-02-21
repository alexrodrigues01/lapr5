using DDDNetCore.Infrastructure.Provider;
using DDDSample1.Infrastructure.Shared;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace DDDSample1.Infrastructure.Provider
{
    public class DbSQLServer : IDbProvider
    {
        public void AddDBContext(IServiceCollection service, IConfiguration configuration)
        {
            service.AddDbContext<DDDSample1DbContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection"))
                    .ReplaceService<IValueConverterSelector, StronglyEntityIdValueConverterSelector>()); 
        }
    }
}