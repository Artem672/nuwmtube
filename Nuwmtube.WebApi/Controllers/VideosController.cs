using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Nuwmtube.Application.Videos;
using Nuwmtube.Domain.Models;

namespace Nuwmtube.WebApi.Controllers
{
    public class VideosController : BaseApiController
    {
        [HttpGet("{id}")]
        public async Task<IActionResult> GetVideo(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        [HttpPost]
        public async Task<IActionResult> CreateVideo([FromBody] Video video)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Video = video }));
        }

        [HttpPut("{id}")]
        [Authorize(Policy = "IsCreator")]
        public async Task<IActionResult> EditVideo(Guid id, [FromBody] Video video)
        {
            video.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Video = video }));
        }

        [Authorize(Policy = "IsCreator")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVideo(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchVideos([FromQuery] string searchText = "")
        {
            return HandleResult(await Mediator.Send(new Search.Query { SearchText = searchText }));
        }
    }
}
