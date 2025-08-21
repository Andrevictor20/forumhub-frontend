'use server';

import type { Reply, User } from "@/types";
import { handleDeleteReply, handleMarkAsSolution } from "@/app/respostas/actions";
import Link from "next/link";

interface ReplyCardProps {
  reply: Reply;
  topicId: string;
  currentUser: User | null;
  isTopicAuthor: boolean;
}

export async function ReplyCard({ reply, topicId, currentUser, isTopicAuthor }: ReplyCardProps) {
  const isReplyAuthor = currentUser ? currentUser.nome === reply.nomeAutor : false;
  
  const deleteAction = handleDeleteReply.bind(null, reply.id.toString(), topicId);
  const solutionAction = handleMarkAsSolution.bind(null, reply.id.toString(), topicId);

  // Define estilos com base no status 'solucao'
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
            <form action={deleteAction}>
              <button
                type="submit"
                className="text-xs font-bold text-red-400 hover:text-red-300"
                title="Excluir resposta"
              >
                X
              </button>
            </form>
          </div>
        )}
      </div>
      <div className="flex justify-between items-end mt-3">
        <div className="text-xs text-gray-500">
          - {reply.nomeAutor}
        </div>
        {/* O botão só aparece se o usuário for o autor do tópico E a resposta ainda não for a solução */}
        {isTopicAuthor && !reply.solucao && (
          <form action={solutionAction}>
            <button
              type="submit"
              className="px-3 py-1 text-xs font-medium text-green-400 rounded-md hover:bg-green-900/50"
            >
              Marcar como Solução
            </button>
          </form>
        )}
      </div>
    </div>
  );
}