using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Nuwmtube.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddPosterUrlProp : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PosterUrl",
                table: "Videos",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PosterUrl",
                table: "Videos");
        }
    }
}
