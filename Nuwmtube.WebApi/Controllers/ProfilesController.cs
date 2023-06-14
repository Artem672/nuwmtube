using Microsoft.AspNetCore.Mvc;
using Nuwmtube.Application.Profiles;

namespace Nuwmtube.WebApi.Controllers
{
    public class ProfilesController : BaseApiController
    {
        [HttpGet("{username}")]
        public async Task<IActionResult> GetProfile(string username)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Username = username }));
        }
    }
}
