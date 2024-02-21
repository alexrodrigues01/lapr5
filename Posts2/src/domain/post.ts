import { AggregateRoot } from '../core/domain/AggregateRoot';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { PostId } from './postId';
import { Result } from '../core/logic/Result';
import { Guard } from '../core/logic/Guard';
import { ComentarioId } from './comentarioId';
import { IPostDTO } from '../dto/IPostDTO';

interface PostProps {
  utilizador: string;
  texto: string;
  tags: string[];
  likes: string[];
  dislikes: string[];
  comentarios: string[];
}

export class Post extends AggregateRoot<PostProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get postId(): PostId {
    return PostId.caller(this.id);
  }

  get utilizador(): string {
    return this.props.utilizador;
  }

  get texto(): string {
    return this.props.texto;
  }

  get tags(): string[] {
    return this.props.tags;
  }

  get likes(): string[] {
    return this.props.likes;
  }

  set likes(likes: string[]) {
    this.props.likes = likes;
  }

  set dislikes(dislikes: string[]) {
    this.props.dislikes = dislikes;
  }

  get dislikes(): string[] {
    return this.props.dislikes;
  }

  get comentarios(): string[] {
    return this.props.comentarios;
  }

  set comentarios(comentarioId: string[]) {
    this.props.comentarios = comentarioId;
  }

  adicionarLike(userId: string) {
    this.likes.push(userId);
  }

  adicionarDislike(userId: string) {
    this.dislikes.push(userId);
  }

  private constructor(props: PostProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: PostProps, id?: UniqueEntityID): Result<Post> {
    const guardedProps = [
      { argument: props.utilizador, argumentName: 'utilizador' },
      { argument: props.texto, argumentName: 'texto' },
      { argument: props.tags, argumentName: 'tags' },
      { argument: props.likes, argumentName: 'likes' },
      { argument: props.dislikes, argumentName: 'dislikes' },
      { argument: props.comentarios, argumentName: 'comentarios' },
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Post>(guardResult.message);
    } else {
      const post = new Post(
        {
          ...props,
        },
        id,
      );

      return Result.ok<Post>(post);
    }
  }

  public static create2(postDto: IPostDTO, id?: UniqueEntityID): Result<Post> {
    const utilizador = postDto.utilizador;
    const texto = postDto.texto;
    const tags = postDto.tags;
    const likes = [];
    const dislikes = [];
    const comentarios = [];

    if (utilizador.length === 0) {
      return Result.fail<Post>('Tem que introduzir o utilizador que fez o post');
    }
    if (texto.length === 0) {
      return Result.fail<Post>('Tem que introduzir o texto do post');
    }

    const tagsString = tags.split(',');

    const post = new Post({
      utilizador: utilizador,
      texto: texto,
      tags: tagsString,
      likes: likes,
      dislikes: dislikes,
      comentarios: comentarios,
    });
    return Result.ok<Post>(post);
  }
}
