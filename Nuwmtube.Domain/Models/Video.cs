namespace Nuwmtube.Domain.Models
{
    public class Video
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public Guid UserId  { get; set; }

        public DateTime Date { get; set; }

        public string Description { get; set; }

        public string PosterUrl { get; set; }
    }
}
