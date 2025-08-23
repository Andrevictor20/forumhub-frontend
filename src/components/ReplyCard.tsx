'use client';

import type { Reply, User } from "@/types";
import { handleDeleteReply, handleMarkAsSolution } from "@/app/respostas/actions";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import toast from "react-hot-toast";

interface ReplyCardProps {
  reply: Reply;
  currentUser: User | null;
  isTopicAuthor: boolean;
  topicId: string;
}

export function ReplyCard({ reply, currentUser, isTopicAuthor, topicId }: ReplyCardProps) {
  const isReplyAuthor = currentUser ? currentUser.nome === reply.nomeAutor : false;

  const onDelete = async () => {
    if (!window.confirm("Tem a certeza de que deseja apagar esta resposta?")) return;
    
    const result = await handleDeleteReply(reply.id.toString(), topicId);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  const onMarkAsSolution = async () => {
    const result = await handleMarkAsSolution(reply.id.toString(), topicId);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  const cardBorderColor = reply.solucao ? 'border-green-500' : 'border-gray-700';
  const cardBgColor = reply.solucao ? 'bg-green-900/20' : 'bg-gray-900';

  return (
    <div className={`p-4 rounded-md border ${cardBorderColor} ${cardBgColor}`}>
      {reply.solucao && (
        <p className="text-sm font-bold text-green-400 mb-2">SOLUÇÃO</p>
      )}
      <div className="flex justify-between items-start gap-4">
        <p className="text-gray-300 flex-1 break-words">{reply.mensagem}</p>
        
        {isReplyAuthor && (
          <div className="flex items-center gap-3">
            <Link href={`/respostas/${reply.id}/editar`} className="text-xs text-gray-400 hover:text-white">
              Editar
            </Link>
            <button
              onClick={onDelete}
              className="text-xs font-bold text-red-400 hover:text-red-300"
              title="Excluir resposta"
            >
              X
            </button>
          </div>
        )}
      </div>
      <div className="flex justify-between items-end mt-3">
        <div className="text-xs text-gray-500">
          - {reply.nomeAutor}, em {formatDate(reply.dataCriacao)}
        </div>
        {isTopicAuthor && !reply.solucao && (
          <button
            onClick={onMarkAsSolution}
            className="px-3 py-1 text-xs font-medium text-green-400 rounded-md hover:bg-green-900/50"
          >
            Marcar como Solução
          </button>
        )}
      </div>
    </div>
  );
}
