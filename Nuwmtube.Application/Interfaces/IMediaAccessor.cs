using Microsoft.AspNetCore.Http;
using Nuwmtube.Application.Media;

namespace Nuwmtube.Application.Interfaces
{
    public interface IMediaAccessor
    {
        Task<MediaUploadResult> UploadPhoto(IFormFile file);

        Task<MediaUploadResult> UploadVideo(IFormFile file);

        Task<string> DeleteMedia(string publicId);
    }
}
