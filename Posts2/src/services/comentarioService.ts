import { Inject, Service } from 'typedi';
import IComentarioService from './IServices/IComentarioService';
import config from '../../config';
import IComentarioRepo from './IRepos/IComentarioRepo';
import { IComentarioDto } from '../dto/IComentarioDto';
import { Result } from '../core/logic/Result';
import { Role } from '../domain/role';
import IRoleDTO from '../dto/IRoleDTO';
import { RoleMap } from '../mappers/RoleMap';
import { Comentario } from '../domain/comentario';
import { ComentarioMap } from '../mappers/ComentarioMap';

@Service()
export default class ComentarioService implements IComentarioService {
  constructor(@Inject(config.repos.comentario.name) private comentarioRepo: IComentarioRepo) {}

  public async createComentario(comentarioDto: IComentarioDto): Promise<Result<IComentarioDto>> {
    try {
      const comentarioOrError = await Comentario.create(comentarioDto);

      if (comentarioOrError.isFailure) {
        return Result.fail<IComentarioDto>(comentarioOrError.errorValue());
      }

      const roleResult = comentarioOrError.getValue();

      await this.comentarioRepo.save(roleResult);

      const comentarioDTOResult = ComentarioMap.toDTO(roleResult) as IComentarioDto;
      return Result.ok<IComentarioDto>(comentarioDTOResult);
    } catch (e) {
      throw e;
    }
  }

  public async getComentarioByID(comentarioID: string): Promise<Result<IComentarioDto>> {
    try {
      const comentarioOrError = await this.comentarioRepo.findById(comentarioID);
      if (comentarioOrError === null) {
        return Result.fail<IComentarioDto>('Erro ao obter o comentario');
      }
      const comentarioResult = ComentarioMap.toDTO(comentarioOrError) as IComentarioDto;
      return Result.ok<IComentarioDto>(comentarioResult);
    } catch (e) {
      throw e;
    }
  }
}
