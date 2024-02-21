import { Inject, Service } from 'typedi';
import IRoleController from './IControllers/IRoleController';
import config from '../../config';
import IRoleService from '../services/IServices/IRoleService';
import { NextFunction, Request, Response } from 'express';
import IRoleDTO from '../dto/IRoleDTO';
import { Result } from '../core/logic/Result';
import IComentarioController from './IControllers/IComentarioController';
import IComentarioService from '../services/IServices/IComentarioService';
import { IComentarioDto } from '../dto/IComentarioDto';
import IPostService from '../services/IServices/IPostService';
import { IPostDTO } from '../dto/IPostDTO';

@Service()
export default class ComentarioController
  implements IComentarioController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
    @Inject(config.services.comentario.name) private comentarioServiceInstance: IComentarioService,
    @Inject(config.services.post.name) private postServiceInstance: IPostService,
  ) {}

  public async createComentario(req: Request, res: Response, next: NextFunction) {
    try {
      const comentarioOrError = (await this.comentarioServiceInstance.createComentario(
        req.body as IComentarioDto,
      )) as Result<IComentarioDto>;

      const postOrError = await this.postServiceInstance.addComentario(
        req.body as IComentarioDto,
        comentarioOrError.getValue(),
      );

      if (comentarioOrError.isFailure || postOrError.isFailure) {
        return res.status(402).send();
      }

      const comentarioDTO = comentarioOrError.getValue();
      return res.json(comentarioDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }

  public async getComentarioByID(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.comentarioID;
      const comentarioOrError = (await this.comentarioServiceInstance.getComentarioByID(userId)) as Result<
        IComentarioDto
      >;

      if (comentarioOrError.isFailure) {
        return res.status(400).send();
      }
      const posts = comentarioOrError.getValue();
      return res.json(posts).status(201);
    } catch (e) {
      return next(e);
    }
  }
}
