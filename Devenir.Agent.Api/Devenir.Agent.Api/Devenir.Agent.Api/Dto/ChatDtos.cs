using System.Text.Json.Serialization;

namespace Devenir.Agent.Api.Dto;
public class ChatPartDto
{
    [JsonPropertyName("type")]
    public string? Type { get; set; }

    [JsonPropertyName("text")]
    public string? Text { get; set; }
}

public class ChatMessageStreamDto
{
    [JsonPropertyName("role")]
    public required string Role { get; set; }

    // Cambiado a opcional (string?) para que no falle cuando el SDK use 'parts'
    [JsonPropertyName("content")]
    public string? Content { get; set; }

    [JsonPropertyName("parts")]
    public List<ChatPartDto>? Parts { get; set; }

    // Método helper para extraer el texto independientemente de cómo lo envíe el SDK
    public string GetText()
    {
        if (!string.IsNullOrWhiteSpace(Content))
            return Content;

        if (Parts != null && Parts.Count > 0)
        {
            var textParts = Parts
                .Where(p => p.Type == "text" && !string.IsNullOrWhiteSpace(p.Text))
                .Select(p => p.Text);

            return string.Join("", textParts);
        }

        return string.Empty;
    }
}

public class ChatRequestStreamDto
{
    [JsonPropertyName("messages")]
    public List<ChatMessageStreamDto> Messages { get; set; } = new();
}