﻿using Nuwmtube.Application.Core;
using System.Net;
using System.Text.Json;

namespace Nuwmtube.WebApi.Middleware
{
    public class ExceptionMiddleware
    {
        public RequestDelegate _next { get; }

        public ILogger<ExceptionMiddleware> _logger { get; }

        public IHostEnvironment _environment { get; }

        public ExceptionMiddleware(
            RequestDelegate next,
            ILogger<ExceptionMiddleware> logger,
            IHostEnvironment environment)
        {
            _next = next;
            _logger = logger;
            _environment = environment;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                var response = _environment.IsDevelopment()
                    ? new AppException(context.Response.StatusCode, ex.Message, ex.StackTrace.ToString())
                    : new AppException(context.Response.StatusCode, "Internal Server Error");

                var options = new JsonSerializerOptions
                {
                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase
                };

                var json = JsonSerializer.Serialize(response, options);

                await context.Response.WriteAsync(json);
            }
        }
    }
}
