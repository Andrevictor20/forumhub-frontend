import { getTopicById } from "@/services/topic_service";
import { cookies } from "next/headers";
import type { Topic } from "@/types";
import { EditTopicForm } from "@/components/EditTopicForm";

interface TopicEditPageProps {
  params: {
    id: string;
  }
}

export default async function TopicEditPage({ params }: TopicEditPageProps) {
  const { id } = await params;
  const token = (await cookies()).get('token')?.value;
  const topic: Topic | null = await getTopicById(id, token);

  if (!topic) {
    return (
      <main className="container mx-auto p-8 text-center">
        <h1 className="text-2xl text-red-500">Tópico não encontrado.</h1>
      </main>
    );
  }

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Editar Tópico
      </h1>
      <div className="max-w-2xl mx-auto">
        <EditTopicForm topic={topic} />
      </div>
    </main>
  );
}
