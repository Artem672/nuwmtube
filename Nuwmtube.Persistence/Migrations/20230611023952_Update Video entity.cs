using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Nuwmtube.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class UpdateVideoentity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Videos");

            migrationBuilder.RenameColumn(
                name: "PosterUrl",
                table: "Videos",
                newName: "FileName");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "FileName",
                table: "Videos",
                newName: "PosterUrl");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Videos",
                type: "TEXT",
                nullable: true);
        }
    }
}
