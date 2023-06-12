using Microsoft.AspNetCore.Identity;
using Nuwmtube.Domain.Models;

namespace Nuwmtube.Persistence.Models
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser {DisplayName = "Nazar", UserName="Nazar", Email="nazar@test.com"},
                    new AppUser {DisplayName = "Vitalik", UserName="Vitalik", Email="vitalik@test.com"},
                    new AppUser {DisplayName = "Artem", UserName="Artem", Email="artem@test.com"}
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }

            if (context.Videos.Any()) return;

            var videos = new List<Video>
            {
                new Video
                {
                    Name = "Nature",
                }
            };

            await context.Videos.AddRangeAsync(videos);
            await context.SaveChangesAsync();
        }
    }
}
