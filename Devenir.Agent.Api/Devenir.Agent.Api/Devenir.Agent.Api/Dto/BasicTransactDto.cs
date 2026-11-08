using System.Text.Json.Serialization;

namespace Devenir.Agent.Api.Dto;

public class AskRequest { 
    public required string Prompt { get; set; } 
}

public class AskResponse { 
    public required string Response { get; set; } 
}

public class ChatMessageDto
{
    public  string Role { get; set; } = string.Empty;
    public  string Content { get; set; } = string.Empty;
}

public class ChatHistoryRequest
{
    public string? SystemPrompt { get; set; }
    public List<ChatMessageDto> Messages { get; set; } = new();
}

public class ChatHistoryResponse
{
    public string Response { get; set; } = string.Empty;
    public List<ChatMessageDto> UpdatedMessages { get; set; } = new();
}
public class StreamAskRequest
{
    public string Prompt { get; set; } = string.Empty;
    public string? SystemPrompt { get; set; }
}


