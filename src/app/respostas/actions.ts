'use server';

import { createReply, deleteReply, markAsSolution } from "@/services/reply_service";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

export async function handleCreateReply(formData: FormData, topicId: string) {
  // Esta action já é chamada por um formulário cliente, então pode retornar um resultado.
  const token = (await cookies()).get('token')?.value;
  formData.append('topicoId', topicId);
  
  const result = await createReply(formData, token);

  if (result) {
    revalidateTag(`replies:${topicId}`);
    return { success: true, message: "Resposta publicada com sucesso!" };
  } else {
    return { success: false, message: "Falha ao publicar a resposta." };
  }
}

export async function handleDeleteReply(replyId: string, topicId: string) {
  const token = (await cookies()).get('token')?.value;
  const result = await deleteReply(replyId, token);

  if (result?.success) {
    revalidateTag(`replies:${topicId}`);
    return { success: true, message: "Resposta apagada com sucesso!" };
  } else {
    return { success: false, message: "Falha ao apagar a resposta." };
  }
}

export async function handleMarkAsSolution(replyId: string, topicId: string) {
  const token = (await cookies()).get('token')?.value;
  const result = await markAsSolution(replyId, token);

  if (result?.success) {
    revalidateTag(`replies:${topicId}`);
    return { success: true, message: "Resposta marcada como solução!" };
  } else {
    return { success: false, message: "Falha ao marcar como solução." };
  }
}
