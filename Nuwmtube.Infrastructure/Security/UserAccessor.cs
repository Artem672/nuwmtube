using Microsoft.AspNetCore.Http;
using Nuwmtube.Application.Interfaces;
using System.Security.Claims;

namespace Nuwmtube.Infrastructure.Security
{
    public class UserAccessor : IUserAccessor
    {
        private readonly IHttpContextAccessor _httpContext;

        public UserAccessor(IHttpContextAccessor httpContext)
        {
            _httpContext = httpContext;
        }


        public string GetUsername()
        {
            return _httpContext.HttpContext.User.FindFirstValue(ClaimTypes.Name);
        }
    }
}
