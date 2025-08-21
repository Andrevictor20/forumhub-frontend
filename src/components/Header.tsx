import { cookies } from "next/headers";
import Link from "next/link";
import { logout } from "@/app/actions";

export async function Header() {
  const token = (await cookies()).get('token')?.value;
  const isLoggedIn = !!token;

  return (
    <header className="bg-gray-800 border-b border-gray-700">
      <nav className="container mx-auto px-8 flex justify-between items-center h-16">
        <Link href="/" className="text-xl font-bold text-cyan-400 hover:text-cyan-300">
          ForumHub
        </Link>

        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <Link href="/topicos/novo" className="px-4 py-2 text-sm text-white bg-cyan-600 rounded-md hover:bg-cyan-700">
                Criar Tópico
              </Link>
              <form action={logout}>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm text-gray-300 rounded-md hover:bg-gray-700"
                >
                  Sair
                </button>
              </form>
            </div>
          ) : (
            <Link href="/login" className="px-4 py-2 text-sm text-white bg-cyan-600 rounded-md hover:bg-cyan-700">
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}