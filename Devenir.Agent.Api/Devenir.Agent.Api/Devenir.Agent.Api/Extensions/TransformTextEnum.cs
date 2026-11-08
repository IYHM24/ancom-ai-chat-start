namespace Devenir.Agent.Api.Extensions;

public static class TransformTextEnum
{
    public static string ToString<TEnum>(this TEnum enumValue) where TEnum : Enum
    {
        // Obtiene el nombre del valor del enum
        string enumName = enumValue.ToString();
        return enumName;
    }
}