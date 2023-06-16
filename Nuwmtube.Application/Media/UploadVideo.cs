using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Nuwmtube.Application.Core;
using Nuwmtube.Application.Interfaces;
using Nuwmtube.Application.Videos;
using Nuwmtube.Domain.Models;
using Nuwmtube.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nuwmtube.Application.Media
{
    public class UploadVideo
    {
        public class Command : IRequest<Result<VideoDto>>
        {
            public string VideoName { get; set; }
            public IFormFile File { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<VideoDto>>
        {
            private readonly DataContext _context;

            private readonly IMediaAccessor _mediaAccessor;

            private readonly IUserAccessor _userAccessor;

            private readonly IMapper _mapper;

            public Handler(DataContext dataContext,
                IMediaAccessor mediaAccessor,
                IUserAccessor userAccessor,
                IMapper mapper)
            {
                _context = dataContext;
                _mediaAccessor = mediaAccessor;
                _userAccessor = userAccessor;
                _mapper = mapper;
            }

            public async Task<Result<VideoDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users
                    .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                if (user == null) return null;

                var videoUploadResult = await _mediaAccessor.UploadVideo(request.File);

                var video = new Video()
                {
                    Date = DateTime.Now,
                    User = user,
                    FileName = request.File.FileName,
                    Name = request.VideoName,
                    UserId = user.Id,
                    LocationUrl = videoUploadResult.Url,
                    PublicId = videoUploadResult.PublicId
                };

                await _context.Videos.AddAsync(video);

                var result = await _context.SaveChangesAsync() > 0;

                if (result) return Result<VideoDto>.Success(_mapper.Map<VideoDto>(video));

                await _mediaAccessor.DeleteMedia(videoUploadResult.PublicId);
                return Result<VideoDto>.Failure("Problem adding video");
            }
        }
    }
}
