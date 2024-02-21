import { Mapper } from '../core/infra/Mapper';
import { Comentario } from '../domain/comentario';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { IComentarioDto } from '../dto/IComentarioDto';

export class ComentarioMap extends Mapper<Comentario> {
  public static toDomain(raw: any): Comentario {
    const comentarioOrError = Comentario.create(
      {
        utilizador: raw.utilizador,
        texto: raw.texto,
      },
      new UniqueEntityID(raw.domainId),
    );

    comentarioOrError.isFailure ? console.log(comentarioOrError.error) : '';

    return comentarioOrError.isSuccess ? comentarioOrError.getValue() : null;
  }
  public static toPersistence(comentario: Comentario): any {
    const a = {
      domainId: comentario.id.toString(),
      texto: comentario.texto.toString(),
      utilizador: comentario.utilizador.toString(),
    };
    return a;
  }

  static toDTO(comentario: Comentario) {
    return {
      id: comentario.id.toString(),
      texto: comentario.texto.toString(),
      utilizador: comentario.utilizador.toString(),
    } as IComentarioDto;
  }
}
