'use client';

import { Toaster } from 'react-hot-toast';

export function ToastProvider() {
  return <Toaster 
    position="top-right"
    toastOptions={{
      style: {
        background: '#333',
        color: '#fff',
      },
    }}
  />;
}
