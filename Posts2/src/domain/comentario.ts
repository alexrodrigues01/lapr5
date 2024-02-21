import { Result } from '../core/logic/Result';
import { Guard } from '../core/logic/Guard';
import { AggregateRoot } from '../core/domain/AggregateRoot';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { ComentarioId } from './comentarioId';

interface ComentarioProps {
  texto: string;
  utilizador: string;
}

export class Comentario extends AggregateRoot<ComentarioProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get comentarioId(): ComentarioId {
    return ComentarioId.caller(this.id);
  }

  get texto(): string {
    return this.props.texto;
  }

  get utilizador(): string {
    return this.props.utilizador;
  }

  private constructor(props: ComentarioProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: ComentarioProps, id?: UniqueEntityID): Result<Comentario> {
    const guardedProps = [
      { argument: props.texto, argumentName: 'texto' },
      { argument: props.utilizador, argumentName: 'utilizador' },
    ];
    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
    if (!guardResult.succeeded) {
      return Result.fail<Comentario>(guardResult.message);
    } else {
      const comentario = new Comentario(
        {
          ...props,
        },
        id,
      );
      return Result.ok<Comentario>(comentario);
    }
  }
}
