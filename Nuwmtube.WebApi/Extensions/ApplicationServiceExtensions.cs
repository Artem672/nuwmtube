using FluentValidation;
using FluentValidation.AspNetCore;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Nuwmtube.Application.Core;
using Nuwmtube.Application.Interfaces;
using Nuwmtube.Application.Videos;
using Nuwmtube.Infrastructure.Media;
using Nuwmtube.Infrastructure.Security;
using Nuwmtube.Persistence;

namespace Nuwmtube.WebApi.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(
            this IServiceCollection services,
            IConfiguration configuration)
        {
            services
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
                        policy
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials()
                        .WithOrigins("http://localhost:3000");
                    });
                })
                .AddMediatR(typeof(Search.Handler))
                .AddAutoMapper(typeof(MappingProfiles).Assembly)
                .AddFluentValidationAutoValidation()
                .AddValidatorsFromAssemblyContaining<Create>()
                .AddHttpContextAccessor()
                .AddScoped<IUserAccessor, UserAccessor>()
                .AddScoped<IMediaAccessor, MediaAccessor>()
                .Configure<CloudinarySettings>(configuration.GetSection("Cloudinary"));
            services.AddSignalR();

            return services;
        }
    }
}
