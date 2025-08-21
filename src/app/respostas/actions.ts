'use server';

import { createReply, deleteReply, markAsSolution } from "@/services/reply_service";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";


export async function handleCreateReply(formData: FormData, topicId: string) {
  const token = (await cookies()).get('token')?.value;
  formData.append('topicoId', topicId);
  
  const result = await createReply(formData, token);

  if (result) {
    // Invalida o cache das respostas e do tópico para atualizar a UI
    revalidateTag(`replies:${topicId}`);
    revalidateTag(`topic:${topicId}`);
  } else {
    console.error("Falha ao criar a resposta do lado do servidor.");
  }
}


export async function handleDeleteReply(replyId: string, topicId: string) {
  const token = (await cookies()).get('token')?.value;
  const result = await deleteReply(replyId, token);

  if (result?.success) {
    revalidateTag(`replies:${topicId}`);
    revalidateTag(`topic:${topicId}`);
  } else {
    console.error("Falha ao deletar a resposta do lado do servidor.");
  }
}


export async function handleMarkAsSolution(replyId: string, topicId: string) {
  const token = (await cookies()).get('token')?.value;
  const result = await markAsSolution(replyId, token);

  if (result?.success) {
    revalidateTag(`replies:${topicId}`);
    revalidateTag(`topic:${topicId}`);
  } else {
    console.error("Falha ao marcar como solução do lado do servidor.");
  }
}
