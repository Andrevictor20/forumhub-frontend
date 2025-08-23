import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function formatDate(dateString: string) {
  if (!dateString) return '';
  
  const date = parseISO(dateString);
  
  return format(date, "d 'de' MMM 'de' yyyy, 'às' HH:mm", {
    locale: ptBR,
  });
}
