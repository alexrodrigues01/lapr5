import { Service, Inject } from 'typedi';
import IPostRepo from '../services/IRepos/IPostRepo';
import { Document, FilterQuery, Model } from 'mongoose';
import { IPostPersistence } from '../dataschema/IPostPersistence';
import { PostId } from '../domain/postId';
import { UserId } from '../domain/userId';
import { User } from '../domain/user';
import { UserMap } from '../mappers/UserMap';
import { Post } from '../domain/post';
import { PostMap } from '../mappers/PostMap';

@Service()
export default class PostRepo implements IPostRepo {
  private models: any;

  constructor(@Inject('postSchema') private postSchema: Model<IPostPersistence & Document>) {}

  private createBaseQuery(): any {
    return {
      where: {},
    };
  }

  public async exists(postId: PostId | string): Promise<boolean> {
    const idX = postId instanceof PostId ? (<PostId>postId).id.toValue() : postId;

    const query = { domainId: idX };
    const userDocument = await this.postSchema.findOne(query);

    return !!userDocument === true;
  }
  public async save(post: Post): Promise<Post> {
    const query = { domainId: post.id.toString() };

    const postDocument = await this.postSchema.findOne(query);

    try {
      if (postDocument === null) {
        const rawPost: any = PostMap.toPersistence(post);

        const postCreated = await this.postSchema.create(rawPost);

        return PostMap.toDomain(postCreated);
      } else {
        postDocument.utilizador = post.utilizador;
        postDocument.texto = post.texto;
        postDocument.comentarios = post.comentarios;
        postDocument.likes = post.likes;
        postDocument.dislikes = post.dislikes;
        await postDocument.save();

        return post;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findById(postId: PostId | string): Promise<Post> {
    const idX = postId instanceof PostId ? (<PostId>postId).id.toValue() : postId;

    const query = { domainId: idX };
    const postRecord = await this.postSchema.findOne(query);

    if (postRecord != null) {
      return PostMap.toDomain(postRecord);
    } else return null;
  }

  public async findByUtilizador(userId: string): Promise<Post[]> {
    const query = { utilizador: userId };
    const feedRecord = await this.postSchema.find(query as FilterQuery<IPostPersistence & Document>);
    return feedRecord !== null ? feedRecord.map(postRecord => PostMap.toDomain(postRecord)) : null;
  }
}
