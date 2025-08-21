'use server';

import { updateUser } from "@/services/user_service";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

export async function handleUpdateUser(userId: string, formData: FormData) {
  const token = (await cookies()).get('token')?.value;

  // Filtra campos vazios para não enviar senhas em branco
  const filteredFormData = new FormData();
  if (formData.get('nome')) {
    filteredFormData.append('nome', formData.get('nome') as string);
  }
  if (formData.get('senha')) {
    filteredFormData.append('senha', formData.get('senha') as string);
  }

  const result = await updateUser(userId, filteredFormData, token);

  if (result) {
    revalidateTag('user:me'); // Limpa o cache dos dados do utilizador
    return { success: true, message: "Perfil atualizado com sucesso!" };
  } else {
    return { success: false, message: "Falha ao atualizar o perfil." };
  }
}
