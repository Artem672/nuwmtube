using FluentValidation;
using Nuwmtube.Domain.Models;

namespace Nuwmtube.Application.Videos
{
    public class VideoValidator : AbstractValidator<Video>
    {
        public VideoValidator()
        {
            //ValidatorOptions.Global.LanguageManager.Enabled = false;
            RuleFor(x => x.Name).NotEmpty();
        }
    }
}
