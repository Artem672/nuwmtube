using MediatR;
using Microsoft.EntityFrameworkCore;
using Nuwmtube.Application.Core;
using Nuwmtube.Domain.Models;
using Nuwmtube.Persistence;

namespace Nuwmtube.Application.Videos
{
    public class List
    {
        public class Query : IRequest<Result<List<Video>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Video>>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Video>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Video>>.Success(await _context.Videos.ToListAsync());
            }
        }
    }
}
