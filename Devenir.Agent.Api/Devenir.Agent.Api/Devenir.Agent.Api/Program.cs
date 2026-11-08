using Devenir.Agent.Api.Extensions;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

//Controladores y Open Api
builder.Services.AddControllers();
builder.Services.AddOpenApi();

//Configuracion de CORSS
builder.Services.AddCorssConfiguration(builder.Configuration);

//Agregar el servicio de Semantic Kernel con Ollama
builder.Services.AddOllamaSemanticKernel(
    builder.Configuration
);

var app = builder.Build();

//Configurar Scalar para entorno de desarrollo
if (app.Environment.IsDevelopment())
{
    // Genera el documento JSON de la API en /openapi/v1.json
    app.MapOpenApi();

    // Expone la interfaz gráfica de Scalar
    app.MapScalarApiReference(options =>
    {
        options
            .WithTitle("Devenir Agent API - Documentation")
            .WithTheme(ScalarTheme.Purple) // Temas: Purple, Mars, DeepSpace, BluePlanet, Satyr, etc.
            .WithDefaultHttpClient(ScalarTarget.CSharp, ScalarClient.HttpClient);
    });
}

//Activacion politica de corss
app.UseCors(
    PolicyCorssList.WhiteList.ToString()
);

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
