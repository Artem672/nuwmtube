﻿using MediatR;
using Nuwmtube.Application.Core;
using Nuwmtube.Application.Interfaces;
using Nuwmtube.Persistence;

namespace Nuwmtube.Application.Videos
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;

            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var video = await _context.Videos.FindAsync(request.Id);

                if (video == null) return null;

                _context.Remove(video);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to delete the video!");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
