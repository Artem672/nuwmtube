using Microsoft.AspNetCore.Identity;
using Nuwmtube.Domain.Models;

namespace Nuwmtube.Persistence.Models
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any() && !context.Videos.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName = "Bob",
                        UserName = "bob",
                        Email = "bob@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Jane",
                        UserName = "jane",
                        Email = "jane@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Tom",
                        UserName = "tom",
                        Email = "tom@test.com"
                    },
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }

                var videos = new List<Video>
                {
                    new Video
                    {
                        Id = Guid.NewGuid(),
                        Name = "Video1",
                        FileName = "video1.mp4",
                        Date = DateTime.Now,
                        UserId = users[0].Id,
                        User = users[0]
                    },
                    new Video
                    {
                        Id = Guid.NewGuid(),
                        Name = "Video2",
                        FileName = "video2.mp4",
                        Date = DateTime.Now.AddDays(-1),
                        UserId = users[0].Id,
                        User = users[0]
                    },
                    new Video
                    {
                        Id = Guid.NewGuid(),
                        Name = "Video3",
                        FileName = "video3.mp4",
                        Date = DateTime.Now.AddDays(-2),
                        UserId = users[0].Id,
                        User = users[0]
                    }
                };

                await context.Videos.AddRangeAsync(videos);
                await context.SaveChangesAsync();
            }

        }
    }
}
