import { getTopicById } from "@/services/topic_service";
import { getRepliesByTopicId } from "@/services/reply_service";
import { getMe } from "@/services/user_service";
import { CreateReplyForm } from "@/components/CreateReplyForm";
import { ReplyCard } from "@/components/ReplyCard";
import { cookies } from "next/headers";
import Link from "next/link";
import type { Topic, Reply, User } from "@/types";
import { handleDeleteTopic } from "./actions";

interface TopicDetailPageProps {
  params: {
    id: string;
  }
}

export default async function TopicDetailPage({ params }: TopicDetailPageProps) {
  const { id } = await params;
  const token = (await cookies()).get('token')?.value;
  
  // Buscando dados de diferentes serviços
  const topic: Topic | null = await getTopicById(id, token);
  const replies: Reply[] = await getRepliesByTopicId(id, token);
  const currentUser: User | null = await getMe(token);

  if (!topic) {
    return (
      <main className="container mx-auto p-8 text-center">
        <h1 className="text-2xl text-red-500">Tópico não encontrado.</h1>
      </main>
    );
  }

  const deleteAction = handleDeleteTopic.bind(null, id);
  const isTopicAuthor = currentUser ? currentUser.nome === topic.nomeAutor : false;

  return (
    <main className="container mx-auto p-8">
      <div className="bg-gray-800 p-8 rounded-lg border border-gray-700">
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className="text-sm text-cyan-400 font-medium">{topic.curso}</span>
            <h1 className="text-3xl font-bold text-white mt-2">{topic.titulo}</h1>
            <p className="text-sm text-gray-400 mt-2">
              Criado por: <span className="font-medium">{topic.nomeAutor}</span>
            </p>
          </div>
          
          {isTopicAuthor && (
            <div className="flex items-center gap-2">
              <Link href={`/topicos/${id}/editar`} className="px-4 py-2 text-sm font-medium text-gray-300 rounded-lg hover:bg-gray-700">
                Editar
              </Link>
              <form action={deleteAction}>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-red-400 rounded-lg hover:bg-red-900/50"
                >
                  Excluir
                </button>
              </form>
            </div>
          )}
        </div>
        <div className="prose prose-invert max-w-none text-gray-300">
          <p>{topic.mensagem}</p>
        </div>
      </div>
      
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Respostas</h2>
        <div className="space-y-4">
          {replies && replies.length > 0 ? (
            replies.map(reply => (
              <ReplyCard 
                key={reply.id} 
                reply={reply} 
                topicId={id}
                currentUser={currentUser} 
                isTopicAuthor={isTopicAuthor}
              />
            ))
          ) : (
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <p className="text-gray-500">Nenhuma resposta ainda.</p>
            </div>
          )}
        </div>
        <CreateReplyForm topicId={id} />
      </div>
    </main>
  );
}
