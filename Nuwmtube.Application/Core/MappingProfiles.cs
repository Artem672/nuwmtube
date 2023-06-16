using AutoMapper;
using Nuwmtube.Application.Comments;
using Nuwmtube.Application.Profiles;
using Nuwmtube.Application.Videos;
using Nuwmtube.Domain.Models;
using Profile = AutoMapper.Profile;

namespace Nuwmtube.Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Video, Video>();
            CreateMap<Video, VideoDto>()
                .ForMember(v => v.Profile, o => o.MapFrom(s => s.User))
                .ForMember(v => v.LocationSrc, o => o.MapFrom(s => s.LocationUrl));
            CreateMap<AppUser, Profiles.Profile>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.DisplayName))
                .ForMember(d => d.Username, o => o.MapFrom(s => s.UserName))
                .ForMember(d => d.Bio, o => o.MapFrom(s => s.Bio))
                .ForMember(d => d.Image, o => o.MapFrom(s => s.Photos.FirstOrDefault(x => x.IsMain).Url));
            CreateMap<AppUser, VideosProfileDto>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.DisplayName))
                .ForMember(d => d.Username, o => o.MapFrom(s => s.UserName))
                .ForMember(d => d.Bio, o => o.MapFrom(s => s.Bio))
                .ForMember(d => d.Image, o => o.MapFrom(s => s.Photos.FirstOrDefault(x => x.IsMain).Url));
            CreateMap<Comment, CommentDto>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.Author.DisplayName))
                .ForMember(d => d.Username, o => o.MapFrom(s => s.Author.UserName))
                .ForMember(d => d.Image, o => o.MapFrom(s => s.Author.Photos.FirstOrDefault(x => x.IsMain).Url));
        }
    }
}
