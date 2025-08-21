'use client';

import { handleUpdateTopic } from "@/app/topicos/[id]/editar/actions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import type { Topic } from "@/types";

interface EditTopicFormProps {
  topic: Topic;
}

export function EditTopicForm({ topic }: EditTopicFormProps) {
  const router = useRouter();

  async function clientAction(formData: FormData) {
    const result = await handleUpdateTopic(topic.id.toString(), formData);

    if (result.success) {
      toast.success(result.message);
      router.push(`/topicos/${topic.id}`);
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
          defaultValue={topic.titulo}
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
          defaultValue={topic.mensagem}
        ></textarea>
      </div>
      <div className="flex justify-end gap-4">
        <button
          type="submit"
          className="px-5 py-2.5 text-sm font-medium text-white bg-cyan-600 rounded-lg hover:bg-cyan-700"
        >
          Salvar Alterações
        </button>
      </div>
    </form>
  );
}
