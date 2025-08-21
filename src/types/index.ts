
export interface Topic {
  id: number;
  titulo: string;
  mensagem: string;
  nomeAutor: string;
  curso: string;
}
export interface Reply {
  id: number;
  mensagem: string;
  nomeAutor: string;
  dataCriacao: string; 
  solucao: boolean;
}