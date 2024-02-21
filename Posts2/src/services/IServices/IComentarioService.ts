import { IComentarioDto } from '../../dto/IComentarioDto';
import { Result } from '../../core/logic/Result';

export default interface IComentarioService {
  createComentario(comentarioDto: IComentarioDto): Promise<Result<IComentarioDto>>;
  getComentarioByID(comentarioID: string): Promise<Result<IComentarioDto>>;
}
