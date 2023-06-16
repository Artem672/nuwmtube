using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Nuwmtube.Application.Core;
using Nuwmtube.Application.Interfaces;
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
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _context = context;
                _mapper = mapper;
                _userAccessor = userAccessor;
            }

            public async Task<Result<List<VideoDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var searchText = request.SearchText.ToLower();

                var videos = await _context
                                    .Videos
                                    .Where(x => x.Name.ToLower().Contains(searchText))
                                    .ProjectTo<VideoDto>(_mapper.ConfigurationProvider,
                                     new { currentUsername = _userAccessor.GetUsername() })
                                    .ToListAsync();

                return Result<List<VideoDto>>.Success(videos);
            }
        }
    }
}
