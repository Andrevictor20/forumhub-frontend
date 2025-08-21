import { login } from "./actions";

export default function LoginPage() {
  return (
    <main className="container mx-auto flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-md border border-gray-700">
        <h1 className="text-2xl font-bold text-center text-white">
          Acessar ForumHub
        </h1>
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
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-cyan-600 rounded-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-cyan-500"
          >
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
}