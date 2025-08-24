'use server';

import { deleteTopic } from "@/services/topic_service";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import type { ActionResult } from "@/types"; // Importar o novo tipo

export async function handleDeleteTopic(topicId: string): Promise<ActionResult> {
  const token = (await cookies()).get('token')?.value;
  const result = await deleteTopic(topicId, token);

  if (result?.success) {
    revalidateTag('topics');
    revalidateTag(`topic:${topicId}`);
    return { success: true, message: "Tópico apagado com sucesso!" };
  } else {
    return { success: false, message: "Falha ao apagar o tópico. Verifique as suas permissões." };
  }
}
