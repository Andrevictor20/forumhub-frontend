import { cookies } from "next/headers";
import Link from "next/link";
import { TopicCard } from "@/components/TopicCard";
import { getTopics } from "@/services/topic_service";
import { LandingPage } from "@/components/LandingPage";
import { PaginationControls } from "@/components/PaginationControls";
import { SearchBar } from "@/components/SearchBar";

interface HomePageProps {
  searchParams: {
    page?: string;
    q?: string;
  }
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const token = (await cookies()).get('token')?.value;
  const isLoggedIn = !!token;

  if (!isLoggedIn) {
    return (
      <main className="container mx-auto">
        <LandingPage />
      </main>
    );
  }

  // Corrigido: Adicionado 'await' para resolver os searchParams
  const resolvedSearchParams = await searchParams;
  const page = resolvedSearchParams.page ? parseInt(resolvedSearchParams.page, 10) : 0;
  const query = resolvedSearchParams.q;
  
  const { content: topics, totalPages, number: currentPage } = await getTopics(token, page, query);

  return (
    <main className="container mx-auto p-4 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-center sm:text-left">
          Tópicos Recentes
        </h1>
        <Link 
          href="/topicos/novo" 
          className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium text-center text-white bg-cyan-600 rounded-lg hover:bg-cyan-700"
        >
          Criar Novo Tópico
        </Link>
      </div>

      <SearchBar />

      {topics && topics.length > 0 ? (
        <>
          <div className="space-y-6">
            {topics.map((topic) => (
              <TopicCard key={topic.id} topic={topic} />
            ))}
          </div>
          <PaginationControls currentPage={currentPage} totalPages={totalPages} />
        </>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500">
            Nenhum tópico encontrado.
          </p>
        </div>
      )}
    </main>
  );
}
