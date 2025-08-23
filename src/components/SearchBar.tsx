'use client';

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');

  useEffect(() => {
    const timer = setTimeout(() => {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      
      if (query) {
        newSearchParams.set('q', query); // Atualiza para usar o parâmetro 'q'
      } else {
        newSearchParams.delete('q');
      }
      newSearchParams.delete('page');

      // Evita um push desnecessário se a query não mudou
      if ((searchParams.get('q') || '') !== query) {
        router.push(`/?${newSearchParams.toString()}`);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query, router, searchParams]);

  const handleClear = () => {
    setQuery('');
  };

  return (
    <div className="mb-8">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por título ou curso..." // Placeholder atualizado
          className="w-full pl-4 pr-10 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white"
            aria-label="Limpar busca"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
