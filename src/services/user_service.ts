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
    if (!response.ok) throw new Error('Credenciais inválidas');
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