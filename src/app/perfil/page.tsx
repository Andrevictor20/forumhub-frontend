import { cookies } from "next/headers";
import { getMe } from "@/services/user_service";
import type { User } from "@/types";
import { UpdateProfileForm } from "@/components/UpdateProfileForm";

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

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Meu Perfil</h1>
      <div className="max-w-2xl bg-gray-800 p-8 rounded-lg border border-gray-700">
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
  );
}
