using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DDDNetCore.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Active = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EstadosHumor",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Estado = table.Column<int>(type: "int", nullable: false),
                    DataEstadoHumor__DataEstadoHumor = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Active = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EstadosHumor", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Families",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Active = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Families", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Introducoes",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    JogadorInicio = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    JogadorIntermedio = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    JogadorObjetivo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Active = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Introducoes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Jogadores",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Nome__Nome = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email__Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Telefone__Telefone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Morada__Pais = table.Column<int>(type: "int", nullable: true),
                    Morada__Rua = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Morada__Localidade = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Morada__CodigoPostal = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Pontuacao__Pontuacao = table.Column<int>(type: "int", nullable: true),
                    DataNascimento__DataNascimento = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LinkedInPerfil__LinkedInPerfil = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FacebookPerfil__FacebookPerfil = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EstadoHumor = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Active = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Jogadores", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PedidosLigacao",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    jogadorInicio = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    jogadorObjetivo = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PedidosLigacao", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CategoryId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Active = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Relacoes",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    JogadorA = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    JogadorB = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ForcaLigacao__ForcaLigacao = table.Column<int>(type: "int", nullable: true),
                    ForcaRelacao__ForcaRelacao = table.Column<int>(type: "int", nullable: true),
                    DataRelacao__DataRelacao = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Active = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Relacoes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Tags",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Descricao__Descricao = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Active = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tags", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Jogadores_InterestTags",
                columns: table => new
                {
                    jogadorid = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    tagid = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Jogadores_InterestTags", x => new { x.jogadorid, x.Id });
                    table.ForeignKey(
                        name: "FK_Jogadores_InterestTags_Jogadores_jogadorid",
                        column: x => x.jogadorid,
                        principalTable: "Jogadores",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Relacoes_TagsRelacao",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    RelacaoId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    tagid = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    jogadorid = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Relacoes_TagsRelacao", x => new { x.RelacaoId, x.Id });
                    table.ForeignKey(
                        name: "FK_Relacoes_TagsRelacao_Relacoes_RelacaoId",
                        column: x => x.RelacaoId,
                        principalTable: "Relacoes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropTable(
                name: "EstadosHumor");

            migrationBuilder.DropTable(
                name: "Families");

            migrationBuilder.DropTable(
                name: "Introducoes");

            migrationBuilder.DropTable(
                name: "Jogadores_InterestTags");

            migrationBuilder.DropTable(
                name: "PedidosLigacao");

            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "Relacoes_TagsRelacao");

            migrationBuilder.DropTable(
                name: "Tags");

            migrationBuilder.DropTable(
                name: "Jogadores");

            migrationBuilder.DropTable(
                name: "Relacoes");
        }
    }
}
