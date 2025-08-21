'use server';

import { updateTopic } from "@/services/topic_service";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

export async function handleUpdateTopic(topicId: string, formData: FormData) {
  const token = (await cookies()).get('token')?.value;

  const result = await updateTopic(topicId, formData, token);

  if (result) {
    revalidateTag(`topic:${topicId}`);
    revalidateTag('topics');
    return { success: true, message: "Tópico atualizado com sucesso!" };
  } else {
    return { success: false, message: "Falha ao atualizar o tópico." };
  }
}
