using FluentValidation;
using MediatR;
using Nuwmtube.Application.Core;
using Nuwmtube.Domain.Models;
using Nuwmtube.Persistence;

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
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                request.Video.Date = DateTime.Now;
                _context.Videos.Add(request.Video);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create video");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
