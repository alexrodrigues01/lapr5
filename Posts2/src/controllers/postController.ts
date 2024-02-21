import { Inject, Service } from 'typedi';
import IPostController from './IControllers/IPostController';
import { NextFunction, Request, Response } from 'express';
import config from '../../config';
import IRoleService from '../services/IServices/IRoleService';
import IPostService from '../services/IServices/IPostService';
import IRoleDTO from '../dto/IRoleDTO';
import { Result } from '../core/logic/Result';
import { IPostDTO } from '../dto/IPostDTO';

@Service()
export default class PostController implements IPostController {
  constructor(@Inject(config.services.post.name) private postServiceInstance: IPostService) {}

  public async createPost(req: Request, res: Response, next: NextFunction) {
    try {
      const postOrError = (await this.postServiceInstance.createPost(req.body as IPostDTO)) as Result<IPostDTO>;

      if (postOrError.isFailure) {
        return res.status(402).send();
      }

      const postDTO = postOrError.getValue();
      return res.json(postDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }

  public async getPostsByUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.userID;
      const postsOrError = (await this.postServiceInstance.getPostsByUser(userId)) as Result<IPostDTO[]>;

      if (postsOrError.isFailure) {
        return res.status(400).send();
      }
      const posts = postsOrError.getValue();
      return res.json(posts).status(201);
    } catch (e) {
      return next(e);
    }
  }

  public async reacao(req: Request, res: Response, next: NextFunction) {
    try {
      const postID = req.body.post;
      const userID = req.body.userID;
      const valor = req.body.valor;
      const postOrError = (await this.postServiceInstance.reacao(postID, userID, valor)) as Result<IPostDTO>;

      if (postOrError.isFailure) {
        return res.status(404).send();
      }
      const postDto = postOrError.getValue();

      return res.json(postDto).status(201);
    } catch (e) {
      return next(e);
    }
  }
}
