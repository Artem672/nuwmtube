using MediatR;
using Microsoft.EntityFrameworkCore;
using Nuwmtube.Domain.Models;
using Nuwmtube.Persistence;

namespace Nuwmtube.Application.Videos
{
    public class Search
    {
        public class Query : IRequest<List<Video>>
        {
            public string SearchText { get; set; } = string.Empty;
        }

        public class Handler : IRequestHandler<Query, List<Video>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Video>> Handle(Query request, CancellationToken cancellationToken)
            {
                var videos = _context
                    .Videos
                    .AsEnumerable()
                    .Where(x => x.Name.Contains(request.SearchText, StringComparison.OrdinalIgnoreCase))
                    .ToList();

                return videos;
            }
        }
    }
}
