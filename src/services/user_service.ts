const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function loginUser(data: FormData): Promise<string | null> {
  const email = data.get('email');
  const senha = data.get('senha');
  const payload = { login: email, senha: senha };

  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Credenciais inválidas');
      } else if (response.status === 404) {
        throw new Error('Usuário não encontrado');
      } else {
        throw new Error('Erro no servidor');
      }
    }
    
    const result = await response.json();
    return result.token;
  } catch (error) {
    console.error("Erro no login:", error);
    return null;
  }
}

export async function createUser(data: FormData) {
  try {
    const response = await fetch(`${API_URL}/usuarios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(data)),
    });
    if (!response.ok) throw new Error('Falha ao cadastrar usuário.');
    return await response.json();
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    return null;
  }
}

export async function getMe(token: string | undefined) {
  if (!token) return null;

  try {
    const response = await fetch(`${API_URL}/usuarios/me`, {
      headers: { 'Authorization': `Bearer ${token}` },
      next: { tags: ['user:me'] },
    });
    if (!response.ok) throw new Error('Falha ao buscar dados do usuário.');
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return null;
  }
}
export async function updateUser(id: string, data: FormData, token: string | undefined) {
  if (!token) {
    throw new Error('Acesso não autorizado');
  }

  // A API espera 'nome' e 'senha'. Se a senha estiver vazia, não a enviamos.
  const nome = data.get('nome');
  const senha = data.get('senha');
  
  const payload: { nome?: string; senha?: string } = {};
  if (nome) payload.nome = nome as string;
  if (senha) payload.senha = senha as string;

  try {
    const response = await fetch(`${API_URL}/usuarios/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Falha ao atualizar o perfil.');
    }
    return await response.json();
  } catch (error) {
    console.error("Erro ao atualizar o perfil:", error);
    return null;
  }
}