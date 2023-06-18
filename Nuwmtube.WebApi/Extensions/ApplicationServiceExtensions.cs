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
                    var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

                    string connStr;

                    // Depending on if in development or production, use either FlyIO
                    // connection string, or development connection string from env var.
                    if (env == "Development")
                    {
                        // Use connection string from file.
                        connStr = configuration.GetConnectionString("DefaultConnection");
                    }
                    else
                    {
                        // Use connection string provided at runtime by FlyIO.
                        var connUrl = Environment.GetEnvironmentVariable("DATABASE_URL");

                        // Parse connection URL to connection string for Npgsql
                        connUrl = connUrl.Replace("postgres://", string.Empty);
                        var pgUserPass = connUrl.Split("@")[0];
                        var pgHostPortDb = connUrl.Split("@")[1];
                        var pgHostPort = pgHostPortDb.Split("/")[0];
                        var pgDb = pgHostPortDb.Split("/")[1];
                        var pgUser = pgUserPass.Split(":")[0];
                        var pgPass = pgUserPass.Split(":")[1];
                        var pgHost = pgHostPort.Split(":")[0];
                        var pgPort = pgHostPort.Split(":")[1];
                        var updatedHost = pgHost.Replace("flycast", "internal");

                        connStr = $"Server={updatedHost};Port={pgPort};User Id={pgUser};Password={pgPass};Database={pgDb};";
                    }

                    // Whether the connection string came from the local development configuration file
                    // or from the environment variable from FlyIO, use it to set up your DbContext.
                    opt.UseNpgsql(connStr);
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
