
namespace Devenir.Agent.Api.Extensions;

public enum PolicyCorssList
{
   WhiteList = 1
}

public static class CorssExtension
{
    public static IServiceCollection AddCorssConfiguration(
        this IServiceCollection services,
        IConfiguration configuration
    )
    {

        // 2. Registrar el servicio de CORS
        services.AddCors(options =>
        {
            options.AddPolicy(
                name: PolicyCorssList.WhiteList.ToString(), 
                policy =>
                {
                    policy.WithOrigins(
                        "http://localhost:5173",
                        "https://6af13f880352e75388419c24--devenir-ai.netlify.app", // SIN / AL FINAL
                        "https://devenir-ai.netlify.app"
                    ).AllowAnyHeader()
                     .AllowAnyMethod()
                     .AllowCredentials();
                }
            );
        });

        return services;
    }
}
