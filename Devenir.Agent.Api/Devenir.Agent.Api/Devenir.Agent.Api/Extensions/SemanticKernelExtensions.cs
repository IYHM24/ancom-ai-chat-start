using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.SemanticKernel;

namespace Devenir.Agent.Api.Extensions;

public static class SemanticKernelExtensions
{
    public static IServiceCollection AddOllamaSemanticKernel(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        var modelId = configuration["Ollama:ModelId"] ?? "qwen2.5:7b";
        var endpoint = configuration["Ollama:Endpoint"] ?? "http://localhost:11434";

        services.AddTransient<Kernel>(sp =>
        {
            var builder = Kernel.CreateBuilder();

            // Registrar el conector de Ollama Chat Completion
            builder.AddOllamaChatCompletion(
                modelId: modelId,
                endpoint: new Uri(endpoint)
            );

            // Aquí podrás registrar plugins globales en el futuro si lo necesitas
            // builder.Plugins.AddFromType<MiPlugin>();

            return builder.Build();
        });

        return services;
    }
}
