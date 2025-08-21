import type { Reply } from "@/types";

interface ReplyCardProps {
  reply: Reply;
}

export function ReplyCard({ reply }: ReplyCardProps) {
  return (
    <div className="bg-gray-900 p-4 rounded-md border border-gray-700">
      <p className="text-gray-300">{reply.mensagem}</p>
      <div className="text-right text-xs text-gray-500 mt-3">
        - {reply.nomeAutor}
      </div>
    </div>
  );
}