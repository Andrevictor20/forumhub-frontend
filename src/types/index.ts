export interface Topic {
  id: number;
  titulo: string;
  mensagem: string;
  nomeAutor: string;
  curso: string;
  dataCriacao: string; 
}

export interface Reply {
  id: number;
  mensagem: string;
  nomeAutor: string;
  dataCriacao: string; 
  solucao: boolean;
}

export interface User {
  id: number;
  nome: string;
  login: string;
}

export interface PaginatedTopicsResponse {
  content: Topic[];
  totalPages: number;
  totalElements: number;
  number: number; 
}