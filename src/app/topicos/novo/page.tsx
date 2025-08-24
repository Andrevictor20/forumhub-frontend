import { CreateTopicForm } from "@/components/CreateTopicForm";
import { BackButton } from "@/components/BackButton"; // Importar

export default function NewTopicPage() {
  return (
    <div className="container mx-auto p-4 sm:p-8">
      <BackButton />
      <h1 className="text-4xl font-bold mb-8 text-center">
        Criar Novo Tópico
      </h1>
      <div className="max-w-2xl mx-auto">
        <CreateTopicForm />
      </div>
    </div>
  );
}
