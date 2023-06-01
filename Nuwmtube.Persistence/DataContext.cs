using Microsoft.EntityFrameworkCore;
using Nuwmtube.Domain.Models;

namespace Nuwmtube.Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options) { }

        public DbSet<Video> Videos { get; set; }
    }
}
