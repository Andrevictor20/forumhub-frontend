'use client';

import { useSearchParams, useRouter } from "next/navigation";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
}

export function PaginationControls({ currentPage, totalPages }: PaginationControlsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePrev = () => {
    const newPage = currentPage - 1;
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('page', newPage.toString());
    router.push(`/?${newSearchParams.toString()}`);
  };

  const handleNext = () => {
    const newPage = currentPage + 1;
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('page', newPage.toString());
    router.push(`/?${newSearchParams.toString()}`);
  };

  const hasPrevPage = currentPage > 0;
  const hasNextPage = currentPage < totalPages - 1;

  return (
    <div className="flex justify-center items-center gap-4 mt-8">
      <button
        onClick={handlePrev}
        disabled={!hasPrevPage}
        className="px-4 py-2 text-sm font-medium text-white bg-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600"
      >
        Anterior
      </button>
      <span className="text-sm text-gray-400">
        Página {currentPage + 1} de {totalPages}
      </span>
      <button
        onClick={handleNext}
        disabled={!hasNextPage}
        className="px-4 py-2 text-sm font-medium text-white bg-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600"
      >
        Próxima
      </button>
    </div>
  );
}
