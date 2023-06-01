using Nuwmtube.Domain.Models;

namespace Nuwmtube.Persistence.Models
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Videos.Any()) return;

            var videos = new List<Video>
            {
                new Video
                {
                    Name = "Nature",
                    Date = DateTime.Now,
                }
            };

            await context.Videos.AddRangeAsync(videos);
            await context.SaveChangesAsync();
        }
    }
}
