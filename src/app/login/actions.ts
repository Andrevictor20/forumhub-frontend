'use server';

import { loginUser } from "@/services/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const token = await loginUser(formData);

  if (!token) {
    return redirect('/login?error=InvalidCredentials');
  }

  (await cookies()).set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', 
    maxAge: 60 * 60 * 24 * 7, 
    path: '/', 
  });
  
  redirect('/');
}