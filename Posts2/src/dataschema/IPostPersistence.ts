import { Comentario } from '../domain/comentario';

export interface IPostPersistence {
  _id: string;
  utilizador: string;
  texto: string;
  tags: string[];
  likes: string[];
  dislikes: string[];
  comentarios: string[];
}
