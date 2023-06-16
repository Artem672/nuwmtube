using Nuwmtube.Application.Videos;
using Nuwmtube.Domain.Models;

namespace Nuwmtube.Application.Profiles
{
    public class Profile
    {
        public string Username { get; set; }

        public string DisplayName { get; set; }

        public string Bio { get; set; }

        public string Image { get; set; }

        public bool Following { get; set; }

        public int FollowersCount { get; set; }

        public int FollowingCount { get; set; }

        public ICollection<VideoDto> Videos { get; set; }

        public ICollection<Photo> Photos { get; set; }
    }
}
