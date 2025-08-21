'use server';

import { createTopic } from "@/services/topic_service";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

export async function handleCreateTopic(formData: FormData) {
  const token = (await cookies()).get('token')?.value;
  const result = await createTopic(formData, token);

  if (!result) {
    return { success: false, message: "Falha ao criar o tópico." };
  }

  revalidateTag('topics');
  return { success: true, message: "Tópico criado com sucesso!" };
}
