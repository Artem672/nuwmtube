using AutoMapper;
using MediatR;
using Nuwmtube.Domain.Models;
using Nuwmtube.Persistence;

namespace Nuwmtube.Application.Videos
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Video Video { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var video = await _context.Videos.FindAsync(request.Video.Id);

                _mapper.Map(request.Video, video);

                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}
