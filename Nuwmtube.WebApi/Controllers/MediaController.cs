using Microsoft.AspNetCore.Mvc;
using Nuwmtube.Application.Media;

namespace Nuwmtube.WebApi.Controllers
{
    public class MediaController : BaseApiController
    {

        [HttpPost("photo")]
        public async Task<IActionResult> UploadPhoto([FromForm] UploadPhoto.Command command)
        {
            return HandleResult(await Mediator.Send(command));
        }

        [HttpDelete("photo/{id}")]
        public async Task<IActionResult> DeletePhoto(string id)
        {
            return HandleResult(await Mediator.Send(new DeletePhoto.Command { Id = id }));
        }

        [HttpPost("photo/{id}/setMain")]
        public async Task<IActionResult> SetMain(string id)
        {
            return HandleResult(await Mediator.Send(new SetMain.Command { Id = id }));
        }

        [HttpPost("video")]
        public async Task<IActionResult> UploadVideo([FromForm] UploadVideo.Command command)
        {
            return HandleResult(await Mediator.Send(command));
        }
    }
}
