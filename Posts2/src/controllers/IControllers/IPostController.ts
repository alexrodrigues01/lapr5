import { NextFunction, Request, Response } from 'express';

export default interface IPostController {
  createPost(req: Request, res: Response, next: NextFunction);
  getPostsByUser(req: Request, res: Response, next: NextFunction);
  reacao(req: Request, res: Response, next: NextFunction);
}
