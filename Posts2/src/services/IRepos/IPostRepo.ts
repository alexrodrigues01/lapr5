import { Repo } from '../../core/infra/Repo';
import { Post } from '../../domain/post';
import { PostId } from '../../domain/postId';

export default interface IPostRepo extends Repo<Post> {
  save(post: Post): Promise<Post>;
  findByUtilizador(userId: string): Promise<Post[]>;
  findById(id: PostId | string): Promise<Post>;
}
