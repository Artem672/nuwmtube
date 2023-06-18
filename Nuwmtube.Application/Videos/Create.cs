using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Nuwmtube.Application.Core;
using Nuwmtube.Application.Interfaces;
using Nuwmtube.Domain.Models;
using Nuwmtube.Persistence;
using System.Security.Claims;

namespace Nuwmtube.Application.Videos
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Video Video { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Video).SetValidator(new VideoValidator());
            }
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
                var user = await _context.Users.FirstOrDefaultAsync(x =>
                x.UserName == _userAccessor.GetUsername());

                request.Video.Date = DateTime.UtcNow;
                request.Video.User = user;
                request.Video.UserId = user.Id;

                await _context.Videos.AddAsync(request.Video);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create video");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
