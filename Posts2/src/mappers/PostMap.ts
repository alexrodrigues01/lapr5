import { Post } from '../domain/post';
import { Mapper } from '../core/infra/Mapper';
import { User } from '../domain/user';
import { UserEmail } from '../domain/userEmail';
import { UserPassword } from '../domain/userPassword';
import { Container } from 'typedi';
import RoleRepo from '../repos/roleRepo';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { IPostDTO } from '../dto/IPostDTO';
import { ComentarioId } from '../domain/comentarioId';

export class PostMap extends Mapper<Post> {
  public static  toDomain(raw: any): Post {
    const postOrError = Post.create(
      {
        utilizador: raw.utilizador,
        texto: raw.texto,
        tags: raw.tags,
        likes: raw.likes,
        dislikes: raw.dislikes,
        comentarios: raw.comentarios,
      },
      new UniqueEntityID(raw.domainId),
    );

    postOrError.isFailure ? console.log(postOrError.error) : '';

    return postOrError.isSuccess ? postOrError.getValue() : null;
  }

  public static toPersistence(post: Post): any {
    const a = {
      domainId: post.id.toString(),
      utilizador: post.utilizador.toString(),
      texto: post.texto.toString(),
      tags: post.tags,
      likes: post.likes,
      dislikes: post.dislikes,
      comentarios: post.comentarios,
    };
    return a;
  }

  static toDTO(post: Post): IPostDTO {
    var comentariosString: string[] = [];
    for (var i = 0; i < post.comentarios.length; i++) {
      comentariosString[i] = post.comentarios[i] + '';
    }
    let tagsString = '';
    for (let i = 0; i < post.tags.length; i++) {
      if (i === 0) {
        tagsString = post.tags[i];
      } else {
        tagsString = tagsString + ',' + post.tags[i];
      }
    }
    return {
      id: post.id.toString(),
      utilizador: post.utilizador.toString(),
      texto: post.texto.toString(),
      tags: tagsString,
      likes: post.likes,
      dislikes: post.dislikes,
      comentarios: comentariosString,
    } as IPostDTO;
  }
}
