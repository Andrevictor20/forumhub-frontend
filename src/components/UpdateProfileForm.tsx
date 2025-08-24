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
      router.refresh();
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
      <form action={clientUpdateAction} className="space-y-6">
        {/* ... inputs de nome e senha ... */}
        <div className="flex justify-end">
          <SubmitButton
            type="submit"
            className="px-5 py-2.5 text-sm font-medium text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 disabled:bg-cyan-800"
          >
            Salvar Alterações
          </SubmitButton>
        </div>
      </form>

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
