using MediatR;
using Nuwmtube.Persistence;

namespace Nuwmtube.Application.Videos
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var video = await _context.Videos.FindAsync(request.Id);
                
                _context.Remove(video);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}
