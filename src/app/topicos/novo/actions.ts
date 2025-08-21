'use server';

import { createTopic } from "@/services/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function handleCreateTopic(formData: FormData) {
  const token = (await cookies()).get('token')?.value;

  const result = await createTopic(formData, token);

  if (!result) {
    return redirect('/topicos/novo?error=CreationFailed');
  }

  redirect('/');
}