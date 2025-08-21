import { login } from "./actions";
import Link from "next/link";

interface LoginPageProps {
  searchParams: {
    error?: string;
  };
}

export default function LoginPage({ searchParams }: LoginPageProps) {
  const hasError = searchParams.error === 'InvalidCredentials';

  return (
    <main className="container mx-auto flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-md border border-gray-700">
        <h1 className="text-2xl font-bold text-center text-white">
          Acessar ForumHub
        </h1>
        
        {/* Alerta de erro visual */}
        {hasError && (
          <div className="bg-red-900/50 border border-red-500 text-red-300 text-sm rounded-lg p-3 text-center animate-pulse">
            <div className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Email ou senha incorretos. Tente novamente.
            </div>
          </div>
        )}

        <form action={login} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className={`w-full px-3 py-2 bg-gray-700 border rounded-md text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 transition-colors ${
                hasError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-600'
              }`}
              required
              autoComplete="email"
            />
          </div>
          <div>
            <label
              htmlFor="senha"
              className="block mb-2 text-sm font-medium text-gray-300"
            >
              Senha
            </label>
            <input
              type="password"
              name="senha"
              id="senha"
              className={`w-full px-3 py-2 bg-gray-700 border rounded-md text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 transition-colors ${
                hasError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-600'
              }`}
              required
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-cyan-600 rounded-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-cyan-500 transition-colors"
          >
            Entrar
          </button>
        </form>

        <div className="text-center text-sm text-gray-400">
          Não possui uma conta?{" "}
          <Link href="/cadastrar" className="font-medium text-cyan-400 hover:underline">
            Cadastre-se agora
          </Link>
        </div>

      </div>
    </main>
  );
}