using MediatR;
using Microsoft.EntityFrameworkCore;
using Nuwmtube.Application.Core;
using Nuwmtube.Application.Interfaces;
using Nuwmtube.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;

namespace Nuwmtube.Application.Media
{
    public class DeleteVideo
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;

            private readonly IMediaAccessor _mediaAccessor;

            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext dataContext, IMediaAccessor mediaAccessor, IUserAccessor userAccessor)
            {
                _context = dataContext;
                _mediaAccessor = mediaAccessor;
                _userAccessor = userAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.Include(x => x.Videos)
                    .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                if (user == null) return null;

                var video = user.Videos.FirstOrDefault(x => x.Id == Guid.Parse(request.Id));

                if (video == null) return null;

                var result = await _mediaAccessor.DeleteVideo(video.PublicId);

                if (result == null) return Result<Unit>.Failure("Problem deleting video from Cloudinary");

                user.Videos.Remove(video);
                _context.Videos.Remove(video);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Failure("Problem deleting video from API");
            }
        }
    }
}
