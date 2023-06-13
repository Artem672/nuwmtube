using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Nuwmtube.Persistence;
using System.Security.Claims;

namespace Nuwmtube.Infrastructure.Security
{
    public class IsVideoCreator : IAuthorizationRequirement
    {
    }

    public class IsVideoCreatorHandler : AuthorizationHandler<IsVideoCreator>
    {
        private readonly DataContext _dataContext;

        private readonly IHttpContextAccessor _httpContextAccessor;

        public IsVideoCreatorHandler(DataContext dbContext, IHttpContextAccessor httpContextAccessor)
        {
            _dataContext = dbContext;
            _httpContextAccessor = httpContextAccessor;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsVideoCreator requirement)
        {
            var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null) return Task.CompletedTask;

            var videoId = Guid.Parse(_httpContextAccessor.HttpContext?.Request.RouteValues
                .SingleOrDefault(x => x.Key == "id").Value?.ToString());

            var video = _dataContext.Videos.FindAsync(videoId).Result;

            if (video == null) return Task.CompletedTask;

            if (video.UserId == userId) context.Succeed(requirement);

            return Task.CompletedTask;
        }
    }
}
