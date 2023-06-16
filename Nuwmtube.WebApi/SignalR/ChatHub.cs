using MediatR;
using Microsoft.AspNetCore.SignalR;
using Nuwmtube.Application.Comments;

namespace Nuwmtube.WebApi.SignalR
{
    public class ChatHub : Hub
    {
        private readonly IMediator _mediator;

        public ChatHub(IMediator mediator)
        {
            _mediator = mediator;
        }

        public async Task SendComment(Create.Command command)
        {
            var comment = await _mediator.Send(command);

            await Clients.Group(command.VideoId.ToString())
                .SendAsync("ReceiveComment", comment.Value);
        }

        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            var videoId = httpContext.Request.Query["videoId"];
            await Groups.AddToGroupAsync(Context.ConnectionId, videoId);
            var result = await _mediator.Send(new List.Query { VideoId = Guid.Parse(videoId) });
            await Clients.Caller.SendAsync("LoadComments", result.Value);
        }
    }
}
