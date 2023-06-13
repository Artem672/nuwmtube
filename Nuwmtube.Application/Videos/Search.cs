using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Nuwmtube.Application.Core;
using Nuwmtube.Domain.Models;
using Nuwmtube.Persistence;

namespace Nuwmtube.Application.Videos
{
    public class Search
    {
        public class Query : IRequest<Result<List<VideoDto>>>
        {
            public string SearchText { get; set; } = string.Empty;
        }

        public class Handler : IRequestHandler<Query, Result<List<VideoDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<List<VideoDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var searchText = request.SearchText.ToLower();

                var videos = await _context
                                    .Videos
                                    .Where(x => x.Name.ToLower().Contains(searchText))
                                    .ProjectTo<VideoDto>(_mapper.ConfigurationProvider)
                                    .ToListAsync();

                return Result<List<VideoDto>>.Success(videos);
            }
        }
    }
}
