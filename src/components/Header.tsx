import { cookies } from "next/headers";
import Link from "next/link";
import { logout } from "@/app/actions";
import { getMe } from "@/services/user_service";
import type { User } from "@/types";

export async function Header() {
  const token = (await cookies()).get('token')?.value;
  const isLoggedIn = !!token;

  let currentUser: User | null = null;
  if (isLoggedIn) {
    currentUser = await getMe(token);
  }

  return (
    <header className="bg-gray-800 border-b border-gray-700">
      <nav className="container mx-auto px-4 sm:px-8 flex justify-between items-center h-16">
        <Link href="/" className="text-xl font-bold text-cyan-400 hover:text-cyan-300">
          ForumHub
        </Link>

        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <Link href="/" className="px-3 py-2 text-sm text-gray-300 rounded-md hover:bg-gray-700">
                Tópicos
              </Link>
              <form action={logout}>
                <button
                  type="submit"
                  className="px-3 py-2 text-sm text-gray-300 rounded-md hover:bg-gray-700"
                >
                  Sair
                </button>
              </form>
              {currentUser && (
                <Link 
                  href="/perfil" 
                  className="text-sm font-medium text-white border-l border-gray-600 pl-4 hover:text-cyan-400 truncate max-w-24 sm:max-w-none"
                  title={currentUser.nome} // Mostra o nome completo ao passar o rato
                >
                  {currentUser.nome}
                </Link>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-4">
               <Link href="/cadastrar" className="px-3 sm:px-4 py-2 text-sm text-gray-300 rounded-md hover:bg-gray-700">
                Cadastre-se
              </Link>
              <Link href="/login" className="px-3 sm:px-4 py-2 text-sm text-white bg-cyan-600 rounded-md hover:bg-cyan-700">
                Login
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
