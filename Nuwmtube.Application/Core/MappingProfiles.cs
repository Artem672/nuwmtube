using AutoMapper;
using Nuwmtube.Domain.Models;

namespace Nuwmtube.Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Video, Video>();
        }
    }
}
