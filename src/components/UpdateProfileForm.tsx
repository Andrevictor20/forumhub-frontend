'use client';

import { handleUpdateUser, handleDeleteAccount } from "@/app/perfil/actions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import type { User } from "@/types";
import { SubmitButton } from "./SubmitButton";

interface UpdateProfileFormProps {
  user: User;
}

export function UpdateProfileForm({ user }: UpdateProfileFormProps) {
  const router = useRouter();

  async function clientUpdateAction(formData: FormData) {
    const result = await handleUpdateUser(user.id.toString(), formData);
    if (result.success) {
      toast.success(result.message);
      router.refresh(); // Atualiza os dados da página
    } else {
      toast.error(result.message);
    }
  }

  async function clientDeleteAction() {
    if (!window.confirm("Tem a certeza ABSOLUTA de que deseja excluir a sua conta? Todos os seus tópicos serão apagados e esta ação é irreversível.")) {
      return;
    }
    const result = await handleDeleteAccount();
    if (result.success) {
      toast.success(result.message);
      router.push('/');
    } else {
      toast.error(result.message);
    }
  }

  return (
    <>
      <form action={clientUpdateAction} className="space-y-4">
        {/* INÍCIO DA SEÇÃO ADICIONADA */}
        <div>
          <label htmlFor="nome" className="block text-sm font-medium text-gray-400 mb-1">
            Nome
          </label>
          <input
            type="text"
            id="nome"
            name="nome" // O 'name' é crucial para o FormData do Server Action
            defaultValue={user.nome} // Preenche com o valor atual
            className="block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
            required
          />
        </div>

        <div>
          <label htmlFor="login" className="block text-sm font-medium text-gray-400 mb-1">
            Email (Login)
          </label>
          <input
            type="email"
            id="login"
            name="login" // O 'name' é crucial para o FormData
            defaultValue={user.login} // Preenche com o valor atual
            className="block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
            required
          />
        </div>

        <div>
          <label htmlFor="senha" className="block text-sm font-medium text-gray-400 mb-1">
            Nova Senha
          </label>
          <input
            type="password"
            id="senha"
            name="senha" // O 'name' é crucial para o FormData
            placeholder="Deixe em branco para não alterar"
            className="block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
          />
        </div>
        {/* FIM DA SEÇÃO ADICIONADA */}

        <div className="flex justify-end pt-2">
          <SubmitButton
            type="submit"
            className="px-5 py-2.5 text-sm font-medium text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 disabled:bg-cyan-800"
          >
            Salvar Alterações
          </SubmitButton>
        </div>
      </form>

      {/* A sua seção "Zona de Perigo" continua igual */}
      <div className="mt-8 pt-6 border-t border-red-500/30">
        <h3 className="text-lg font-semibold text-red-400">Zona de Perigo</h3>
        <p className="text-sm text-gray-400 mt-1 mb-4">A exclusão da sua conta é permanente.</p>
        <button
          onClick={clientDeleteAction}
          className="px-5 py-2.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
        >
          Excluir a Minha Conta
        </button>
      </div>
    </>
  );
}