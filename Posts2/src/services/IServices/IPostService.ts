import { IPostDTO } from '../../dto/IPostDTO';
import { Result } from '../../core/logic/Result';

import { IComentarioDto } from '../../dto/IComentarioDto';

export default interface IPostService {
  createPost(postDto: IPostDTO): Promise<Result<IPostDTO>>;
  addComentario(comentarioDto: IComentarioDto, comentarioDto2: IComentarioDto): Promise<Result<IPostDTO>>;
  getPostsByUser(userID: string): Promise<Result<IPostDTO[]>>;
  reacao(post: string, user: string, valor: string): Promise<Result<IPostDTO>>;
}
