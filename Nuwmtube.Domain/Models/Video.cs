namespace Nuwmtube.Domain.Models
{
    public class Video
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string FileName { get; set; }

        public string LocationUrl { get; set; }

        public string PublicId { get; set; }

        public DateTime Date { get; set; }

        public string UserId { get; set; }

        public virtual AppUser User { get; set; }

        public ICollection<Comment> Comments { get; set; } = new List<Comment>();
    }
}
