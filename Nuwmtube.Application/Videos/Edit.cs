using AutoMapper;
using FluentValidation;
using MediatR;
using Nuwmtube.Application.Core;
using Nuwmtube.Domain.Models;
using Nuwmtube.Persistence;

namespace Nuwmtube.Application.Videos
{
    public class Edit
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

            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var video = await _context.Videos.FindAsync(request.Video.Id);

                if (video == null) return null;

                _mapper.Map(request.Video, video);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to update the video");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
