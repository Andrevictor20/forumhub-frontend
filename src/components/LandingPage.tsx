import Link from "next/link";

function FeatureIcon({ d, ...props }: { d: string } & React.SVGProps<SVGSVGElement>) {
  return (
    <svg className="w-10 h-10 text-cyan-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={d}></path>
    </svg>
  );
}

export function LandingPage() {
  return (
    <div className="bg-gray-900 text-white">
      {/* Secção Hero Principal */}
      <section className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
          Onde a Curiosidade Gera Conhecimento. <span className="text-cyan-400">Bem-vindo ao ForumHub.</span>
        </h1>
        <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-400 sm:text-xl">
          Uma comunidade vibrante para estudantes, curiosos e especialistas de todas as áreas. Partilhe as suas dúvidas, colabore em projetos e expanda os seus horizontes.
        </p>
        <div className="mt-10">
          <Link 
            href="/cadastrar" 
            className="px-8 py-4 text-lg font-bold text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 transition-transform transform hover:scale-105"
          >
            Junte-se à Comunidade
          </Link>
        </div>
      </section>

      {/* Secção de Funcionalidades */}
      <section className="bg-gray-800 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Simples. Intuitivo. Colaborativo.</h2>
            <p className="text-gray-400 mt-2">A plataforma ideal para aprender, ensinar e conectar-se.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="p-6 text-center">
              {/* CORREÇÃO AQUI: Adicionado 'flex justify-center' para centrar o ícone */}
              <div className="flex justify-center">
                <FeatureIcon d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Inicie Discussões</h3>
              <p className="text-gray-400">Faça perguntas claras sobre qualquer assunto e receba ajuda de uma comunidade empenhada.</p>
            </div>
            <div className="p-6 text-center">
              {/* CORREÇÃO AQUI: Adicionado 'flex justify-center' para centrar o ícone */}
              <div className="flex justify-center">
                <FeatureIcon d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2V7a2 2 0 012-2h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 01.293.707V8z" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Partilhe o que Sabe</h3>
              <p className="text-gray-400">Ajude outros membros, partilhe as suas perspetivas e construa a sua reputação como um conhecedor na sua área de interesse.</p>
            </div>
            <div className="p-6 text-center">
              {/* CORREÇÃO AQUI: Adicionado 'flex justify-center' para centrar o ícone */}
              <div className="flex justify-center">
                <FeatureIcon d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Encontre a Resposta Certa</h3>
              <p className="text-gray-400">O autor do tópico pode marcar a resposta mais útil como a solução, facilitando a aprendizagem de todos na comunidade.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Secção Final - Call to Action */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold">Pronto para Expandir os Seus Horizontes?</h2>
        <p className="mt-4 max-w-xl mx-auto text-gray-400">
          Chega de estudar sozinho. Junte-se a milhares de membros e transforme a sua forma de aprender e colaborar.
        </p>
        <div className="mt-8">
          <Link 
            href="/cadastrar" 
            className="px-8 py-4 text-lg font-bold text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 transition-transform transform hover:scale-105"
          >
            Criar a Minha Conta Gratuita
          </Link>
        </div>
      </section>
    </div>
  );
}
