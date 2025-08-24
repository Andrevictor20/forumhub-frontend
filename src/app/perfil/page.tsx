import { cookies } from "next/headers";
import { getMe } from "@/services/user_service";
import { getTopics } from "@/services/topic_service";
import type { User } from "@/types";
import { UpdateProfileForm } from "@/components/UpdateProfileForm";
import { TopicCard } from "@/components/TopicCard";
import { BackButton } from "@/components/BackButton";

export default async function ProfilePage() {
  const token = (await cookies()).get('token')?.value;
  const currentUser: User | null = await getMe(token);

  if (!currentUser) {
    return (
      <main className="container mx-auto p-8 text-center">
        <h1 className="text-2xl text-red-500">Utilizador não encontrado. Faça login novamente.</h1>
      </main>
    );
  }

  const { content: userTopics } = await getTopics(token, 0, undefined, currentUser.nome);

  return (
    <div className="container mx-auto p-4 sm:p-8"> {/* Padding responsivo */}
      <BackButton/>
      <h1 className="text-3xl sm:text-4xl font-bold mb-8">Meu Perfil</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Coluna de Informações e Atualização */}
        <div className="md:col-span-1">
          <div className="bg-gray-800 p-6 sm:p-8 rounded-lg border border-gray-700">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400">Nome</label>
                <p className="text-lg text-white">{currentUser.nome}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400">Email (Login)</label>
                <p className="text-lg text-white">{currentUser.login}</p>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-700">
              <h2 className="text-xl font-semibold mb-4">Atualizar Informações</h2>
              <UpdateProfileForm user={currentUser} />
            </div>
          </div>
        </div>

        {/* Coluna de Tópicos Publicados */}
        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Meus Tópicos Publicados</h2>
          {userTopics && userTopics.length > 0 ? (
            <div className="space-y-4">
              {userTopics.map(topic => (
                <TopicCard key={topic.id} topic={topic} />
              ))}
            </div>
          ) : (
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 text-center">
              <p className="text-gray-500">Você ainda não publicou nenhum tópico.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
