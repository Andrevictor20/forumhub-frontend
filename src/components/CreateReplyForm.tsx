'use server';

import { handleCreateReply } from "@/app/respostas/actions";

interface CreateReplyFormProps {
  topicId: string;
}

export async function CreateReplyForm({ topicId }: CreateReplyFormProps) {
  // A ação agora é definida e usada diretamente aqui
  async function createReplyAction(formData: FormData) {
    'use server';
    await handleCreateReply(formData, topicId);
  }

  return (
    <form action={createReplyAction} className="mt-6">
      <textarea
        name="mensagem"
        rows={5}
        className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
        placeholder="Escreva sua resposta..."
        required
      ></textarea>
      <div className="flex justify-end mt-4">
        <button
          type="submit"
          className="px-5 py-2.5 text-sm font-medium text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-800"
        >
          Publicar Resposta
        </button>
      </div>
    </form>
  );
}