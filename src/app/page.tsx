import { cookies } from "next/headers";
import Link from "next/link";
import { TopicCard } from "@/components/TopicCard";
import { getTopics } from "@/services/topic_service"; 
import { LandingPage } from "@/components/LandingPage";

export default async function HomePage() {
  const token = (await cookies()).get('token')?.value;
  const isLoggedIn = !!token;

  if (!isLoggedIn) {
    return (
      <main className="container mx-auto">
        <LandingPage />
      </main>
    );
  }

  const { content: topics } = await getTopics(token);

  return (
    <main className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">
          Tópicos Recentes
        </h1>
        <Link 
          href="/topicos/novo" 
          className="px-5 py-2.5 text-sm font-medium text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-800"
        >
          Criar Novo Tópico
        </Link>
      </div>

      {topics.length > 0 ? (
        <div className="space-y-6">
          {topics.map((topic) => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500">
            Nenhum tópico encontrado.
          </p>
          <p className="text-gray-400 mt-2">Seja o primeiro a criar um!</p>
        </div>
      )}
    </main>
  );
}