import { Comentario } from '../../domain/comentario';
import { Repo } from '../../core/infra/Repo';

export default interface IComentarioRepo extends Repo<Comentario> {
  save(comentario: Comentario): Promise<Comentario>;
  findById(id: string): Promise<Comentario>;
}
