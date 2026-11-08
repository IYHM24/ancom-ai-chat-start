
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
                    policy.WithOrigins("http://localhost:5173") // El puerto de tu frontend (Vite/React)
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                }
            );
        });

        return services;
    }
}
