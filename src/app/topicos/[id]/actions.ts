'use server';

import { deleteTopic } from "@/services/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function handleDeleteTopic(topicId: string) {
  const token = (await cookies()).get('token')?.value;

  const result = await deleteTopic(topicId, token);

  if (result?.success) {
    revalidatePath('/');
    redirect('/');
  } else {
    
    redirect(`/topicos/${topicId}?error=AuthorizationFailed`);
  }
}