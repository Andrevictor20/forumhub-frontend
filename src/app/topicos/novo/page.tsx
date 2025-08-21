import { handleCreateTopic } from "./actions";

export default function NewTopicPage() {
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Criar Novo Tópico
      </h1>
      <div className="max-w-2xl mx-auto">
        <form action={handleCreateTopic} className="space-y-6 bg-gray-800 p-8 rounded-lg border border-gray-700">
          <div>
            <label htmlFor="titulo" className="block mb-2 text-sm font-medium text-gray-300">
              Título do Tópico
            </label>
            <input
              type="text"
              name="titulo"
              id="titulo"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
              required
              minLength={5}
            />
          </div>
          <div>
            <label htmlFor="mensagem" className="block mb-2 text-sm font-medium text-gray-300">
              Mensagem
            </label>
            <textarea
              name="mensagem"
              id="mensagem"
              rows={8}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
              required
              minLength={10}
            ></textarea>
          </div>
          <div>
            <label htmlFor="curso" className="block mb-2 text-sm font-medium text-gray-300">
              Nome do Curso
            </label>
            <input
              type="text"
              name="curso"
              id="curso"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-cyan-600 rounded-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-cyan-500"
          >
            Publicar Tópico
          </button>
        </form>
      </div>
    </main>
  );
}