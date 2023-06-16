using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Nuwmtube.Application.Core;
using Nuwmtube.Application.Interfaces;
using Nuwmtube.Domain.Models;
using Nuwmtube.Persistence;

namespace Nuwmtube.Application.Comments
{
    public class Create
    {
        public class Command : IRequest<Result<CommentDto>>
        {
            public string Body { get; set; }

            public Guid VideoId { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Body).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command, Result<CommentDto>>
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

            public async Task<Result<CommentDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                var video = await _context.Videos.FindAsync(request.VideoId);

                if (video == null) return null;

                var user = await _context.Users
                    .Include(p => p.Photos)
                    .SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                var comment = new Comment
                {
                    Author = user,
                    Video = video,
                    Body = request.Body,
                };

                video.Comments.Add(comment);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Result<CommentDto>.Success(_mapper.Map<CommentDto>(comment));

                return Result<CommentDto>.Failure("Failed to add comment");
            }
        }
    }
}
