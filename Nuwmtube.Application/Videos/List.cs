using MediatR;
using Microsoft.EntityFrameworkCore;
using Nuwmtube.Domain.Models;
using Nuwmtube.Persistence;

namespace Nuwmtube.Application.Videos
{
    public class List
    {
        public class Query : IRequest<List<Video>> { }

        public class Handler : IRequestHandler<Query, List<Video>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Video>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Videos.ToListAsync();
            }
        }
    }
}
