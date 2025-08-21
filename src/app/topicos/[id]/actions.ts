'use server';

import { deleteTopic } from "@/services/topic_service";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";

export async function handleDeleteTopic(topicId: string) {
  const token = (await cookies()).get('token')?.value;
  const result = await deleteTopic(topicId, token);

  if (result?.success) {
    revalidateTag('topics'); 
    revalidateTag(`topic:${topicId}`);
    redirect('/');
  } else {
    redirect(`/topicos/${topicId}?error=DeletionFailed`);
  }
}