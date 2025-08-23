import { login } from "./actions";
import Link from "next/link";
import { SubmitButton } from "@/components/SubmitButton";

export const dynamic = 'force-dynamic';

interface LoginPageProps {
  searchParams: {
    error?: string;
  };
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const resolvedSearchParams = await searchParams;
  const hasError = resolvedSearchParams.error === 'InvalidCredentials';

  return (
    <main className="container mx-auto flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-md border border-gray-700">
        <h1 className="text-2xl font-bold text-center text-white">
          Acessar ForumHub
        </h1>
        <form action={login} className="space-y-6">
          {hasError && (
            <div className="bg-red-900/50 border border-red-500 text-red-300 text-sm rounded-lg p-3 text-center">
              Credenciais inválidas. Verifique o seu e-mail e senha.
            </div>
          )}
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
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
              required
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
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
              required
            />
          </div>
          <SubmitButton
            type="submit"
            className="w-full px-4 py-2 text-white bg-cyan-600 rounded-md hover:bg-cyan-700 disabled:bg-cyan-800 disabled:cursor-not-allowed"
          >
            Entrar
          </SubmitButton>
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
