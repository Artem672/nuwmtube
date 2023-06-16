using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Nuwmtube.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddVideoLocationUrl : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "LocationUrl",
                table: "Videos",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PublicId",
                table: "Videos",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LocationUrl",
                table: "Videos");

            migrationBuilder.DropColumn(
                name: "PublicId",
                table: "Videos");
        }
    }
}
