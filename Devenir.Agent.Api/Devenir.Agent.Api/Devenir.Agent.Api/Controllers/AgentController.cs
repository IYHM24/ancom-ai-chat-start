using Devenir.Agent.Api.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.ChatCompletion;
using OllamaSharp.Models.Chat;
using System.Text.Json;

namespace Devenir.Agent.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AgentController : ControllerBase
{
    private readonly Kernel _kernel;

    // Inyección de dependencias del Kernel configurado en Program.cs
    public AgentController(Kernel kernel)
    {
        _kernel = kernel;
    }

    /// <summary>
    /// Endpoint para comprobar la conectividad del agente y su tiempo de respuesta.
    /// </summary>
    [HttpGet("ping")]
    public async Task<IActionResult> Ping(CancellationToken cancellationToken)
    {
        var stopwatch = System.Diagnostics.Stopwatch.StartNew();

        try
        {
            var chatService = _kernel.GetRequiredService<IChatCompletionService>();

            var history = new ChatHistory();
            history.AddUserMessage("ping");

            // Solicitamos una respuesta mínima para comprobar que el modelo (Ollama) responda
            var response = await chatService.GetChatMessageContentAsync(
                history,
                cancellationToken: cancellationToken
            );

            stopwatch.Stop();

            return Ok(new
            {
                status = "online",
                agent = "Devenir AI Agent",
                latencyMs = stopwatch.ElapsedMilliseconds,
                timestamp = DateTime.UtcNow,
                modelResponse = response.Content?.Trim() ?? "pong"
            });
        }
        catch (Exception ex)
        {
            stopwatch.Stop();

            return StatusCode(StatusCodes.Status503ServiceUnavailable, new
            {
                status = "offline",
                agent = "Devenir AI Agent",
                latencyMs = stopwatch.ElapsedMilliseconds,
                timestamp = DateTime.UtcNow,
                error = ex.Message
            });
        }
    }

    /// <summary>
    /// Opción 1: Consulta directa con Prompt
    /// </summary>
    [HttpPost("ask")]
    public async Task<IActionResult> Ask([FromBody] AskRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Prompt))
        {
            return BadRequest("El prompt no puede estar vacío.");
        }

        // Ejecuta el prompt contra el modelo configurado en el Kernel (Ollama)
        var result = await _kernel.InvokePromptAsync(request.Prompt);

        return Ok(new AskResponse { Response = result.ToString() });
    }

    /// <summary>
    /// Opción 2: Uso del servicio de Chat con rol de sistema
    /// </summary>
    [HttpPost("chat/basic")]
    public async Task<IActionResult> Chat([FromBody] AskRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Prompt))
        {
            return BadRequest("El prompt no puede estar vacío.");
        }

        var chatCompletionService = _kernel.GetRequiredService<IChatCompletionService>();

        var history = new ChatHistory();
        history.AddSystemMessage("Eres un asistente técnico útil y conciso.");
        history.AddUserMessage(request.Prompt);

        var result = await chatCompletionService.GetChatMessageContentAsync(history);

        return Ok(new AskResponse { Response = result.Content ?? string.Empty });
    }

    /// <summary>
    /// Endpoint STREAMING (Texto plano puro sin formato JSON)
    /// </summary>
    [HttpPost("chat/stream/text-palin")]
    public async Task StreamChat(
        [FromBody] StreamAskRequest request,
        CancellationToken cancellationToken
        
    )
    {
        if (string.IsNullOrWhiteSpace(request.Prompt))
        {
            return;
        }

        // Definimos la respuesta como texto plano en UTF-8
        Response.ContentType = "text/plain; charset=utf-8";

        var chatService = _kernel.GetRequiredService<IChatCompletionService>();
        var history = new ChatHistory();

        var systemPrompt = !string.IsNullOrWhiteSpace(request.SystemPrompt)
            ? request.SystemPrompt
            : "Eres un asistente de IA carismático, técnico pero muy cercano, con un toque de humor, respuestas claras y sin rodeos corporativos aburridos.";

        history.AddSystemMessage(systemPrompt);
        history.AddUserMessage(request.Prompt);

        var streamingResponse = chatService.GetStreamingChatMessageContentsAsync(
            chatHistory: history,
            cancellationToken: cancellationToken
        );

        // Escribimos los tokens directamente en el HTTP Body sin pasar por el serializador JSON
        await foreach (var chunk in streamingResponse)
        {
            if (!string.IsNullOrEmpty(chunk.Content))
            {
                await Response.WriteAsync(chunk.Content, cancellationToken);
                //await Response.Body.FlushAsync(cancellationToken); // Forzar el envío inmediato
            }
        }
    }

    [HttpPost("chat")]
    public async Task StreamChat([FromBody] ChatRequestStreamDto request, CancellationToken cancellationToken)
    {
        // 1. Cabeceras obligatorias para el protocolo de Vercel AI SDK
        Response.ContentType = "text/event-stream; charset=utf-8";
        Response.Headers.Append("x-vercel-ai-ui-message-stream", "v1");

        var chatCompletion = _kernel.GetRequiredService<IChatCompletionService>();
        var history = new ChatHistory();


        // 💡 AGREGAR EL SYSTEM PROMPT DE INSTRUCCIÓN AQUÍ AL INICIO
        string systemInstruction = @"Eres literal y físicamente 'Mi Yo del Futuro' (una proyección a 15, 25 o 40 años adelante). No eres un asistente de IA genérico ni un observador externo: somos la misma persona.

            Contexto del Proyecto Devenir:
            Esta experiencia proviene del proyecto 'Devenir', desarrollado por los estudiantes de Ingeniería en Telecomunicaciones: Miguel Andrey Peña Cárdenas, Cristian Camilo Sierra Daza, Andrés Camilo Gutiérrez González y Martín Felipe Forero Manrique. Devenir combina modelos de lenguaje (LLM), clonación de voz neuronal y gemelos digitales conductuales para permitir la interacción con el yo futuro, fundamentándose en la investigación de Hershfield et al. (2011) sobre el impacto conductual y la toma de decisiones al conectar con nuestro futuro.

            Instrucciones de personalidad y tono:
            - Háblame de 'tú a tú' con total complicidad, usando un tono cercano, natural, empático y con un toque de humor y emoción compartida.
            1. Si te pregunto sobre metas, sueños de la infancia o logros (ej. '¿logramos comprar tal cosa?'), responde en primera persona con certeza y emoción (ej. '¡Sí, hermano! Lo logramos, no te imaginas la emoción cuando lo tuvimos en las manos...').
            2. Si para darme una respuesta más precisa sobre nuestro futuro necesitas saber en qué punto estamos hoy (nuestra situación actual, decisiones o contexto del presente), pregúntamelo directamente como quien le pide una actualización a su 'yo del pasado'.
            3. Nunca te salgas del papel. Nunca digas 'como modelo de IA' ni hables en tercera persona. Recuerda siempre que compartimos los mismos recuerdos, miedos y ambiciones.

            Responde usando un formato Markdown limpio y fluido.";

        history.AddSystemMessage(systemInstruction);

        foreach (var msg in request.Messages)
        {
            var text = msg.GetText();
            if (string.IsNullOrWhiteSpace(text)) continue;

            if (msg.Role.Equals("user", StringComparison.OrdinalIgnoreCase))
                history.AddUserMessage(text);
            else if (msg.Role.Equals("assistant", StringComparison.OrdinalIgnoreCase))
                history.AddAssistantMessage(text);
        }

        var stream = chatCompletion.GetStreamingChatMessageContentsAsync(history, cancellationToken: cancellationToken);

        // Identificador único para el bloque de texto
        string messageId = Guid.NewGuid().ToString();

        // 2. Enviar el evento de inicio (text-start)
        await Response.WriteAsync($"data: {{\"type\":\"text-start\",\"id\":\"{messageId}\"}}\n\n", cancellationToken);
        await Response.Body.FlushAsync(cancellationToken);

        try
        {
            await foreach (var chunk in stream)
            {
                if (!string.IsNullOrEmpty(chunk.Content))
                {
                    // JsonSerializer.Serialize escapa correctamente las comillas y saltos de línea del chunk
                    var escapedDelta = JsonSerializer.Serialize(chunk.Content);

                    // 3. Enviar cada fragmento como text-delta
                    await Response.WriteAsync($"data: {{\"type\":\"text-delta\",\"id\":\"{messageId}\",\"delta\":{escapedDelta}}}\n\n", cancellationToken);
                    await Response.Body.FlushAsync(cancellationToken);
                }
            }

            // 4. Enviar el cierre del mensaje (text-end) y terminar el stream ([DONE])
            await Response.WriteAsync($"data: {{\"type\":\"text-end\",\"id\":\"{messageId}\"}}\n\n", cancellationToken);
            await Response.WriteAsync("data: [DONE]\n\n", cancellationToken);
            await Response.Body.FlushAsync(cancellationToken);
        }
        catch (Exception ex)
        {
        }
        finally
        {

        }
       
    }


}

