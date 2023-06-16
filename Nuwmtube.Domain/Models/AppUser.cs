using Microsoft.AspNetCore.Identity;

namespace Nuwmtube.Domain.Models
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }

        public string Bio { get; set; }

        public ICollection<Video> Videos { get; set; }

        public ICollection<Photo> Photos { get; set; }
    }
}
