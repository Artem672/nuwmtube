using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Nuwmtube.Domain.Models;
using Nuwmtube.Persistence;

namespace Nuwmtube.WebApi.Controllers
{
    public class VideoController : BaseApiController
    {
        private readonly DataContext _context;

        public VideoController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Video>>> GetVideos()
        {
            return await _context.Videos.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Video>> GetVideo(Guid id)
        {
            return await _context.Videos.FindAsync(id);
        }
    }
}
