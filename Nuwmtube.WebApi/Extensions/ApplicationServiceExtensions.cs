using MediatR;
using Microsoft.EntityFrameworkCore;
using Nuwmtube.Application.Core;
using Nuwmtube.Application.Videos;
using Nuwmtube.Persistence;

namespace Nuwmtube.WebApi.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(
            this IServiceCollection services,
            IConfiguration configuration)
        {
            return services
                    .AddEndpointsApiExplorer()
                    .AddSwaggerGen()
                    .AddDbContext<DataContext>(opt =>
                    {
                        opt.UseSqlite(configuration.GetConnectionString("DefaultConnection"));
                    })
                    .AddCors(opt =>
                    {
                        opt.AddPolicy("CorsPolicy", policy =>
                        {
                            policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000");
                        });
                    })
                    .AddMediatR(typeof(List.Handler))
                    .AddAutoMapper(typeof(MappingProfiles).Assembly);
        }
    }
}
