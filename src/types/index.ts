export interface Topic {
  id: number;
  titulo: string;
  mensagem: string;
  nomeAutor: string;
  autorAtivo: boolean;
  curso: string;
  dataDeCriacao: string
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
export interface ActionResult {
  success: boolean;
  message: string;
}

