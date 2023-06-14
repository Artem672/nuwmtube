
using Nuwmtube.Application.Profiles;

namespace Nuwmtube.Application.Videos
{
    public class VideoDto
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string FileName { get; set; }

        public string LocationSrc { get; set; }

        public DateTime Date { get; set; }

        public string UserId { get; set; }

        public VideosProfileDto Profile { get; set; }
    }
}
