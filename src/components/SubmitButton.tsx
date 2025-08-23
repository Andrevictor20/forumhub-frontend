'use client';

import { useFormStatus } from 'react-dom';

// Componente de spinner pequeno para usar dentro do botão
function ButtonSpinner() {
  return (
    <div className="border-white h-5 w-5 animate-spin rounded-full border-2 border-t-transparent" />
  );
}

// O tipo estende as propriedades de um botão HTML normal
interface SubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function SubmitButton({ children, className, ...props }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button 
      {...props} 
      className={`${className} flex items-center justify-center`}
      disabled={pending}
    >
      {pending ? <ButtonSpinner /> : children}
    </button>
  );
}
