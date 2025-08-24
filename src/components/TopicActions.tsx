'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { handleDeleteTopic } from "@/app/topicos/[id]/actions";

interface TopicActionsProps {
  topicId: string;
}

export function TopicActions({ topicId }: TopicActionsProps) {
  const router = useRouter();

  const onDelete = async () => {
    // Adiciona uma janela de confirmação
    if (!window.confirm("Tem a certeza de que deseja apagar este tópico? Esta ação é irreversível.")) {
      return;
    }

    const result = await handleDeleteTopic(topicId);
    if (result.success) {
      toast.success(result.message);
      router.push('/');
      router.refresh(); // Garante que a lista de tópicos na home seja atualizada
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Link href={`/topicos/${topicId}/editar`} className="px-4 py-2 text-sm font-medium text-gray-300 rounded-lg hover:bg-gray-700">
        Editar
      </Link>
      <button
        onClick={onDelete}
        className="px-4 py-2 text-sm font-medium text-red-400 rounded-lg hover:bg-red-900/50"
      >
        Excluir
      </button>
    </div>
  );
}
