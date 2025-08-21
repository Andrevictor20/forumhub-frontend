import { handleCreateUser } from "./actions";

interface RegisterPageProps {
  searchParams: {
    error?: string;
  };
}

export default function RegisterPage({ searchParams }: RegisterPageProps) {
  const hasError = searchParams.error === 'RegistrationFailed';

  return (
    <main className="container mx-auto flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-md border border-gray-700">
        <h1 className="text-2xl font-bold text-center text-white">
          Criar Nova Conta
        </h1>
        <form action={handleCreateUser} className="space-y-6">
          {hasError && (
            <div className="bg-red-900/50 border border-red-500 text-red-300 text-sm rounded-lg p-3 text-center">
              Falha ao cadastrar. Verifique se o e-mail já está em uso.
            </div>
          )}
          <div>
            <label
              htmlFor="nome"
              className="block mb-2 text-sm font-medium text-gray-300"
            >
              Nome Completo
            </label>
            <input
              type="text"
              name="nome"
              id="nome"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="login"
              className="block mb-2 text-sm font-medium text-gray-300"
            >
              Email (será seu login)
            </label>
            <input
              type="email"
              name="login"
              id="login"
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
              minLength={6}
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-cyan-600 rounded-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-cyan-500"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </main>
  );
}
