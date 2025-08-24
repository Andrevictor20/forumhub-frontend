import { Topic } from "@/types";
import Link from "next/link";

interface TopicCardProps {
  topic: Topic;
}

export function TopicCard({ topic }: TopicCardProps) {
  return (
    <Link href={`/topicos/${topic.id}`} className="block">
      <article className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700 hover:border-cyan-400 transition-colors duration-300">
        <h2 className="text-xl font-semibold text-white mb-2">{topic.titulo}</h2>
        <p className="text-gray-400 mb-4 line-clamp-2">{topic.mensagem}</p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>Curso: <strong className="font-medium text-cyan-400">{topic.curso}</strong></span>
          
          <div className="flex items-center gap-2">
            <span>Autor:</span>
            <span className={!topic.autorAtivo ? 'line-through text-gray-600' : 'font-medium text-gray-300'}>
              {topic.nomeAutor}
            </span>
            {!topic.autorAtivo && <span className="text-xs text-red-500 font-semibold">[Inativo]</span>}
          </div>

        </div>
      </article>
    </Link>
  );
}
