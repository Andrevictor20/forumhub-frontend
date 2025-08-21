export default function TopicDetailLoading() {
  return (
    <main className="container mx-auto p-8 animate-pulse">
      {/* Skeleton do Tópico Principal */}
      <div className="bg-gray-800 p-8 rounded-lg border border-gray-700">
        <div className="mb-6">
          <div className="h-4 bg-gray-700 rounded w-1/4"></div>
          <div className="h-8 bg-gray-700 rounded w-3/4 mt-3"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2 mt-3"></div>
        </div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-700 rounded"></div>
          <div className="h-4 bg-gray-700 rounded w-5/6"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
      
      {/* Skeleton das Respostas */}
      <div className="mt-10">
        <div className="h-7 bg-gray-700 rounded w-48 mb-4"></div>
        <div className="space-y-4">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <div className="h-4 bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-700 rounded w-5/6 mt-2"></div>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <div className="h-4 bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    </main>
  );
}
