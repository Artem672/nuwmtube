using MediatR;
using Nuwmtube.Application.Core;
using Nuwmtube.Domain.Models;
using Nuwmtube.Persistence;

namespace Nuwmtube.Application.Videos
{
    public class Search
    {
        public class Query : IRequest<Result<List<Video>>>
        {
            public string SearchText { get; set; } = string.Empty;
        }

        public class Handler : IRequestHandler<Query, Result<List<Video>>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Video>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var videos = _context
                    .Videos
                    .AsEnumerable()
                    .Where(x => x.Name.Contains(request.SearchText, StringComparison.OrdinalIgnoreCase))
                    .ToList();

                return Result<List<Video>>.Success(videos);
            }
        }
    }
}
