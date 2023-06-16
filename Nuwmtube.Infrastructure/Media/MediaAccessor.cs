using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Nuwmtube.Application.Interfaces;
using Nuwmtube.Application.Media;

namespace Nuwmtube.Infrastructure.Media
{
    public class MediaAccessor : IMediaAccessor
    {
        private readonly Cloudinary _cloudinary;

        public MediaAccessor(IOptions<CloudinarySettings> config)
        {
            var account = new Account(
                config.Value.CloudName,
                config.Value.ApiKey,
                config.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(account);
        }

        public async Task<MediaUploadResult> UploadPhoto(IFormFile file)
        {
            if (file.Length > 0)
            {
                await using var stream = file.OpenReadStream();
                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription(file.FileName, stream),
                    Transformation = new Transformation().Height(500).Width(500).Crop("fill")
                };

                var uploadResult = await _cloudinary.UploadAsync(uploadParams);

                if (uploadResult == null)
                {
                    throw new Exception(uploadResult.Error.Message);
                }

                return new MediaUploadResult
                {
                    PublicId = uploadResult.PublicId,
                    Url = uploadResult.SecureUrl.ToString(),
                };
            }

            return null;
        }

        public async Task<MediaUploadResult> UploadVideo(IFormFile file)
        {
            if (file.Length > 0)
            {
                await using var stream = file.OpenReadStream();

                var uploadParams = new VideoUploadParams
                {
                    File = new FileDescription(file.FileName, stream)
                };

                var uploadResult = await _cloudinary.UploadAsync(uploadParams);

                if (uploadResult == null)
                {
                    throw new Exception(uploadResult.Error.Message);
                }

                return new MediaUploadResult
                {
                    PublicId = uploadResult.PublicId,
                    Url = uploadResult.SecureUrl.ToString(),
                };
            }

            return null;
        }

        public async Task<string> DeleteMedia(string publicId)
        {
            var deleteParams = new DeletionParams(publicId);
            var result = await _cloudinary.DestroyAsync(deleteParams);
            return result.Result == "ok" ? result.Result : null;
        }
    }
}
