using System.Collections.Generic;
using Microsoft.Data.Entity.Relational.Migrations;
using Microsoft.Data.Entity.Relational.Migrations.Builders;
using Microsoft.Data.Entity.Relational.Migrations.Operations;

namespace OmegaTask.Migrations
{
    public partial class initial : Migration
    {
        public override void Up(MigrationBuilder migration)
        {
            migration.CreateSequence(
                name: "DefaultSequence",
                type: "bigint",
                startWith: 1L,
                incrementBy: 10);
            migration.CreateTable(
                name: "Contact",
                columns: table => new
                {
                    Id = table.Column(type: "int", nullable: false),
                    City = table.Column(type: "nvarchar(max)", nullable: true),
                    Image = table.Column(type: "nvarchar(max)", nullable: true),
                    Info = table.Column(type: "nvarchar(max)", nullable: true),
                    Name = table.Column(type: "nvarchar(max)", nullable: true),
                    Surname = table.Column(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Contact", x => x.Id);
                });
            migration.CreateTable(
                name: "Number",
                columns: table => new
                {
                    Id = table.Column(type: "int", nullable: false),
                    ContactId = table.Column(type: "int", nullable: false),
                    desc = table.Column(type: "nvarchar(max)", nullable: true),
                    numb = table.Column(type: "nvarchar(max)", nullable: true),
                    @type = table.Column(name: "type", type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Number", x => x.Id);
                });
        }
        
        public override void Down(MigrationBuilder migration)
        {
            migration.DropSequence("DefaultSequence");
            migration.DropTable("Contact");
            migration.DropTable("Number");
        }
    }
}
