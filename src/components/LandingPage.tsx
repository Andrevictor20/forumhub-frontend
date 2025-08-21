import Link from "next/link";

export function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center text-center px-4 py-20">
      <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl">
        Bem-vindo ao <span className="text-cyan-400">ForumHub</span>
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-gray-400 sm:text-xl">
        Um espaço para desenvolvedores trocarem ideias, resolverem problemas e compartilharem conhecimento sobre as mais diversas tecnologias.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link 
          href="/cadastrar" 
          className="px-8 py-3 text-lg font-medium text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-800"
        >
          Comece Agora
        </Link>
        <Link 
          href="/login" 
          className="px-8 py-3 text-lg font-medium text-cyan-400 bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-700"
        >
          Já tenho uma conta
        </Link>
      </div>
    </div>
  );
}