export interface PingResponse {
  status: 'online' | 'offline';
  agent: string;
  latencyMs: number;
  timestamp: string;
  modelResponse?: string;
  error?: string;
}

const API_BASE_URL = import.meta.env.VITE_BACK_URL + "/api/agent";

export const checkAgentStatus = async (): Promise<PingResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/ping`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'ngrok-skip-browser-warning': 'true'
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        status: "offline",
        agent: "Devenir AI Agent",
        latencyMs: errorData.latencyMs || 0,
        timestamp: new Date().toISOString(),
        error: errorData.error || "El agente no respondió correctamente",
      };
    }

    return await response.json();
  } catch (error) {
    return {
      status: "offline",
      agent: "Devenir AI Agent",
      latencyMs: 0,
      timestamp: new Date().toISOString(),
      error: "No se pudo establecer conexión con el servidor backend",
    };
  }
};