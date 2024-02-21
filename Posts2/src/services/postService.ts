import IPostService from './IServices/IPostService';
import { Inject, Service } from 'typedi';
import config from '../../config';
import IPostRepo from './IRepos/IPostRepo';
import { IPostDTO } from '../dto/IPostDTO';
import { Result } from '../core/logic/Result';
import { Post } from '../domain/post';
import { PostMap } from '../mappers/PostMap';
import { ComentarioId } from '../domain/comentarioId';
import { PostId } from '../domain/postId';
import { IComentarioDto } from '../dto/IComentarioDto';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';

@Service()
export default class PostService implements IPostService {
  constructor(@Inject(config.repos.post.name) private postRepo: IPostRepo) {}

  public async createPost(postDto: IPostDTO): Promise<Result<IPostDTO>> {
    try {
      const postOrError = await Post.create2(postDto);

      if (postOrError.isFailure) {
        return Result.fail<IPostDTO>(postOrError.errorValue());
      }

      const postResult = postOrError.getValue();

      await this.postRepo.save(postResult);

      const roleDTOResult = PostMap.toDTO(postResult) as IPostDTO;
      return Result.ok<IPostDTO>(roleDTOResult);
    } catch (e) {
      throw e;
    }
  }

  public async addComentario(comentarioDto: IComentarioDto, comentarioDto2: IComentarioDto): Promise<Result<IPostDTO>> {
    try {
      const post = await this.postRepo.findById(new PostId(new UniqueEntityID(comentarioDto.post)));

      if (post === null) {
        return Result.fail<IPostDTO>('Post não encontrado');
      } else {
        let comentariosId = post.comentarios;
        comentariosId.push(comentarioDto2.id);
        post.comentarios = comentariosId;
        await this.postRepo.save(post);

        const postDTOResult = PostMap.toDTO(post) as IPostDTO;
        return Result.ok<IPostDTO>(postDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }

  public async getPostsByUser(userID: string): Promise<Result<IPostDTO[]>> {
    try {
      const postsResult = await this.postRepo.findByUtilizador(userID);
      if (postsResult === null) {
        return Result.fail<IPostDTO[]>('Erro ao obter os posts do utilizador');
      }
      const feedPostsResult = postsResult.map(postResult => PostMap.toDTO(postResult) as IPostDTO);
      return Result.ok<IPostDTO[]>(feedPostsResult);
    } catch (e) {
      throw e;
    }
  }

  public async reacao(post: string, user: string, valor: string): Promise<Result<IPostDTO>> {
    try {
      const postResult = await this.postRepo.findById(post);

      if (postResult === null) {
        return Result.fail<IPostDTO>('Post not found');
      } else {
        if (valor === '1') {
          if (postResult.dislikes.includes(user)) {
            let index = postResult.dislikes.indexOf(user);
            if (index > -1) {
              let dislikes = postResult.dislikes;
              dislikes.splice(index, 1);
              postResult.dislikes = dislikes;
            }
          }
          let likes = postResult.likes;
          likes.push(user);
          postResult.likes = likes;
          await this.postRepo.save(postResult);
        } else {
          if (postResult.likes.includes(user)) {
            let index = postResult.likes.indexOf(user);
            if (index > -1) {
              let likes = postResult.likes;
              likes.splice(index, 1);
              postResult.likes = likes;
            }
          }
          let dislikes = postResult.dislikes;
          dislikes.push(user);
          postResult.dislikes = dislikes;
          await this.postRepo.save(postResult);
        }
        const postDTOResult = PostMap.toDTO(postResult) as IPostDTO;
        return Result.ok<IPostDTO>(postDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }

  // private remover(lista: string[], membro: string): string[] {
  //   let novaLista = [];
  //   for (let i = 0; i < lista.length; i++) {
  //     if (lista[i] !== membro) {
  //       novaLista.push(lista[i]);
  //     }
  //   }
  //   return novaLista;
  // }
}
