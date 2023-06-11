using MediatR;
using Nuwmtube.Application.Core;
using Nuwmtube.Domain.Models;
using Nuwmtube.Persistence;

namespace Nuwmtube.Application.Videos
{
    public class Details
    {
        public class Query : IRequest<Result<Video>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Video>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Video>> Handle(Query request, CancellationToken cancellationToken)
            {
                var video = await _context.Videos.FindAsync(request.Id);

                return Result<Video>.Success(video);
            }
        }
    }
}
