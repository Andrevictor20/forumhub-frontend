import type { PaginatedTopicsResponse } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getTopics(token: string | undefined): Promise<PaginatedTopicsResponse> {
  if (!token) return { content: [], totalPages: 0, totalElements: 0 };
  
  try {
    const response = await fetch(`${API_URL}/topicos`, {
      headers: { 'Authorization': `Bearer ${token}` },
      next: { tags: ['topics'] },
    });
    if (!response.ok) throw new Error('Falha ao buscar tópicos da API');
    return await response.json();
  } catch (error) {
    console.error("Erro no serviço da API:", error);
    return { content: [], totalPages: 0, totalElements: 0 };
  }
}

export async function getTopicById(id: string, token: string | undefined) {
  if (!token) throw new Error('Acesso não autorizado');
  try {
    const response = await fetch(`${API_URL}/topicos/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` },
      next: { tags: [`topic:${id}`] },
    });
    if (!response.ok) throw new Error('Falha ao buscar os detalhes do tópico.');
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar tópico por ID:", error);
    return null;
  }
}

export async function createTopic(data: FormData, token: string | undefined) {
  if (!token) throw new Error('Acesso não autorizado');
  try {
    const response = await fetch(`${API_URL}/topicos`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Object.fromEntries(data)),
    });
    if (!response.ok) throw new Error('Falha ao criar o tópico.');
    return await response.json();
  } catch (error) {
    console.error("Erro ao criar tópico:", error);
    return null;
  }
}

export async function updateTopic(id: string, data: FormData, token: string | undefined) {
  if (!token) throw new Error('Acesso não autorizado');
  try {
    const response = await fetch(`${API_URL}/topicos/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Object.fromEntries(data)),
    });
    if (!response.ok) throw new Error('Falha ao atualizar o tópico.');
    return await response.json();
  } catch (error) {
    console.error("Erro ao atualizar o tópico:", error);
    return null;
  }
}

export async function deleteTopic(id: string, token: string | undefined) {
  if (!token) throw new Error('Acesso não autorizado');
  try {
    const response = await fetch(`${API_URL}/topicos/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Falha ao excluir o tópico.');
    return { success: true }; 
  } catch (error) {
    console.error("Erro ao excluir tópico:", error);
    return null;
  }
}