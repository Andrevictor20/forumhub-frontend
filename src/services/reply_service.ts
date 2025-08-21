const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getRepliesByTopicId(topicId: string, token: string | undefined) {
  if (!token) return [];
  try {
    const response = await fetch(`${API_URL}/topicos/${topicId}/respostas`, {
      headers: { 'Authorization': `Bearer ${token}` },
      next: { tags: [`replies:${topicId}`] },
    });
    if (!response.ok) throw new Error('Falha ao buscar respostas.');
    const data = await response.json();
    return data.content;
  } catch (error) {
    console.error("Erro ao buscar respostas:", error);
    return [];
  }
}

export async function getReplyById(id: string, token: string | undefined) {
    if (!token) throw new Error('Acesso não autorizado');
  
    try {
      const response = await fetch(`${API_URL}/respostas/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` },
        next: { tags: [`reply:${id}`] }
      });
      if (!response.ok) throw new Error('Falha ao buscar dados da resposta.');
      return await response.json();
    } catch (error) {
      console.error("Erro ao buscar resposta por ID:", error);
      return null;
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

export async function updateReply(id: string, data: FormData, token: string | undefined) {
  if (!token) throw new Error('Acesso não autorizado');
  try {
    const response = await fetch(`${API_URL}/respostas/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Object.fromEntries(data)),
    });
    if (!response.ok) throw new Error('Falha ao atualizar a resposta.');
    return await response.json();
  } catch (error) {
    console.error("Erro ao atualizar resposta:", error);
    return null;
  }
}

export async function deleteReply(id: string, token: string | undefined) {
  if (!token) throw new Error('Acesso não autorizado');
  try {
    const response = await fetch(`${API_URL}/respostas/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Falha ao excluir a resposta.');
    return { success: true };
  } catch (error) {
    console.error("Erro ao excluir resposta:", error);
    return null;
  }
}

export async function markAsSolution(id: string, token: string | undefined) {
  if (!token) {
    throw new Error('Acesso não autorizado');
  }

  try {
    const response = await fetch(`${API_URL}/respostas/${id}/solucao`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Falha ao marcar como solução.');
    }
    return { success: true };
  } catch (error) {
    console.error("Erro ao marcar como solução:", error);
    return null;
  }
}