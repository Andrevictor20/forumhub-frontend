'use server';

import { getReplyById, updateReply } from "@/services/reply_service";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import type { Reply } from "@/types";

interface ReplyEditPageProps {
  params: {
    id: string;
  }
}

export default async function ReplyEditPage({ params }: ReplyEditPageProps) {
  const { id } = await params; // Corrigido: usando await
  const token = (await cookies()).get('token')?.value;
  const reply: Reply | null = await getReplyById(id, token);

  async function handleUpdateReply(formData: FormData) {
    'use server';
    const token = (await cookies()).get('token')?.value;
    const result = await updateReply(id, formData, token);

    if (result) {
      // Idealmente, a API de update de resposta deveria retornar o topicId
      // para um redirecionamento mais preciso.
      revalidatePath('/');
      redirect('/'); 
    }
  }

  if (!reply) {
    return (
      <main className="container mx-auto p-8 text-center">
        <h1 className="text-2xl text-red-500">Resposta não encontrada.</h1>
      </main>
    );
  }

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Editar Resposta
      </h1>
      <div className="max-w-2xl mx-auto">
        <form action={handleUpdateReply} className="space-y-6 bg-gray-800 p-8 rounded-lg border border-gray-700">
          <div>
            <label htmlFor="mensagem" className="block mb-2 text-sm font-medium text-gray-300">
              Mensagem
            </label>
            <textarea
              name="mensagem"
              id="mensagem"
              rows={8}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
              required
              defaultValue={reply.mensagem}
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 text-sm font-medium text-white bg-cyan-600 rounded-lg hover:bg-cyan-700"
            >
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}