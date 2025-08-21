import { Topic } from "@/types";
import { cookies } from "next/headers";

interface PaginatedTopicsResponse {
  content: Topic[];
  totalPages: number;
  totalElements: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;



export async function loginUser(data: FormData): Promise<string | null> {
  const email = data.get('email');
  const senha = data.get('senha');

  const payload = {
    login: email,
    senha: senha,
  };

  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Credenciais inválidas');
    }
    
    const result = await response.json();
    return result.token;

  } catch (error) {
    console.error("Erro no login:", error);
    return null;
  }
}
export async function getMe(token: string | undefined) {
  if (!token) return null;

  try {
    const response = await fetch(`${API_URL}/usuarios/me`, { // Supondo que este seja o endpoint
      headers: { 'Authorization': `Bearer ${token}` },
      cache: 'no-store',
    });
    if (!response.ok) throw new Error('Falha ao buscar dados do usuário.');
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return null;
  }
}
export async function getTopics(token: string | undefined): Promise<PaginatedTopicsResponse> {
  if (!token) {
    return { content: [], totalPages: 0, totalElements: 0 };
  }
  
  try {
    const response = await fetch(`${API_URL}/topicos`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Falha ao buscar tópicos da API');
    }

    return await response.json();
  } catch (error) {
    console.error("Erro no serviço da API:", error);
    return { content: [], totalPages: 0, totalElements: 0 };
  }
}
export async function createTopic(data: FormData, token: string | undefined) {
  if (!token) {
    throw new Error('Acesso não autorizado');
  }

  try {
    const response = await fetch(`${API_URL}/topicos`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Object.fromEntries(data)),
    });

    if (!response.ok) {
      throw new Error('Falha ao criar o tópico.');
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao criar tópico:", error);
    return null;
  }
}
export async function getTopicById(id: string, token: string | undefined) {
  if (!token) {
    throw new Error('Acesso não autorizado');
  }

  try {
    const response = await fetch(`${API_URL}/topicos/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Falha ao buscar os detalhes do tópico.');
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar tópico por ID:", error);
    return null;
  }
}
export async function getRepliesByTopicId(topicId: string, token: string | undefined) {
  if (!token) return [];

  try {
    const response = await fetch(`${API_URL}/topicos/${topicId}/respostas`, {
      headers: { 'Authorization': `Bearer ${token}` },
      cache: 'no-store',
    });
    if (!response.ok) throw new Error('Falha ao buscar respostas.');
    const data = await response.json();
    return data.content; // Assumindo que as respostas estão no campo 'content' da paginação
  } catch (error) {
    console.error("Erro ao buscar respostas:", error);
    return [];
  }
}
export async function createReply(data: FormData, token: string | undefined) {
  if (!token) throw new Error('Acesso não autorizado');

  try {
    const response = await fetch(`${API_URL}/respostas`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Object.fromEntries(data)),
    });

    if (!response.ok) throw new Error('Falha ao criar a resposta.');
    return await response.json();
  } catch (error) {
    console.error("Erro ao criar resposta:", error);
    return null;
  }
}
export async function deleteTopic(id: string, token: string | undefined) {
  if (!token) {
    throw new Error('Acesso não autorizado');
  }

  try {
    const response = await fetch(`${API_URL}/topicos/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Falha ao excluir o tópico.');
    }
    return { success: true }; 
  } catch (error) {
    console.error("Erro ao excluir tópico:", error);
    return null;
  }
}