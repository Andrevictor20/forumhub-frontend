'use client';

import { handleCreateTopic } from "@/app/topicos/novo/actions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { SubmitButton } from "./SubmitButton";

export function CreateTopicForm() {
  const router = useRouter();

  async function clientAction(formData: FormData) {
    const result = await handleCreateTopic(formData);

    if (result.success) {
      toast.success(result.message);
      router.push('/');
    } else {
      toast.error(result.message);
    }
  }

  return (
    <form action={clientAction} className="space-y-6 bg-gray-800 p-8 rounded-lg border border-gray-700">
      <div>
        <label htmlFor="titulo" className="block mb-2 text-sm font-medium text-gray-300">
          Título do Tópico
        </label>
        <input
          type="text"
          name="titulo"
          id="titulo"
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
          required
        />
      </div>
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
        ></textarea>
      </div>
      <div>
        <label htmlFor="curso" className="block mb-2 text-sm font-medium text-gray-300">
          Nome do Curso
        </label>
        <input
          type="text"
          name="curso"
          id="curso"
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
          required
        />
      </div>
      <SubmitButton
        type="submit"
        className="w-full px-4 py-2 text-white bg-cyan-600 rounded-md hover:bg-cyan-700 disabled:bg-cyan-800 disabled:cursor-not-allowed"
      >
        Publicar Tópico
      </SubmitButton>
    </form>
  );
}
