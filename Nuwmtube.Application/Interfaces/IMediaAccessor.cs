using Microsoft.AspNetCore.Http;
using Nuwmtube.Application.Media;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nuwmtube.Application.Interfaces
{
    public interface IMediaAccessor
    {
        Task<MediaUploadResult> AddPhoto(IFormFile file);

        Task<string> DeleteMedia(string publicId);
    }
}
