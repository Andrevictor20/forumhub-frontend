'use server';

import { createUser } from "@/services/user_service"; 
import { redirect } from "next/navigation";

export async function handleCreateUser(formData: FormData) {
  const result = await createUser(formData);

  if (result) {
    redirect('/login');
  } else {
    redirect('/cadastrar?error=RegistrationFailed');
  }
}