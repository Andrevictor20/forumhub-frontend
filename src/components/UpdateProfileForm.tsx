'use client';

import { handleUpdateUser } from "@/app/perfil/actions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import type { User } from "@/types";

interface UpdateProfileFormProps {
  user: User;
}

export function UpdateProfileForm({ user }: UpdateProfileFormProps) {
  const router = useRouter();

  async function clientAction(formData: FormData) {
    const result = await handleUpdateUser(user.id.toString(), formData);

    if (result.success) {
      toast.success(result.message);
      // Força uma atualização da página para refletir as mudanças
      router.refresh();
    } else {
      toast.error(result.message);
    }
  }

  return (
    <form action={clientAction} className="space-y-6">
      <div>
        <label htmlFor="nome" className="block mb-2 text-sm font-medium text-gray-300">
          Novo Nome
        </label>
        <input
          type="text"
          name="nome"
          id="nome"
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
          defaultValue={user.nome}
          required
        />
      </div>
      <div>
        <label htmlFor="senha" className="block mb-2 text-sm font-medium text-gray-300">
          Nova Senha (deixe em branco para não alterar)
        </label>
        <input
          type="password"
          name="senha"
          id="senha"
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
          minLength={6}
          placeholder="••••••••"
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-5 py-2.5 text-sm font-medium text-white bg-cyan-600 rounded-lg hover:bg-cyan-700"
        >
          Salvar Alterações
        </button>
      </div>
    </form>
  );
}
