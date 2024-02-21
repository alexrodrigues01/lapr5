import { NextFunction, Request, Response } from 'express';

export default interface IComentarioController {
  createComentario(req: Request, res: Response, next: NextFunction);
  getComentarioByID(req: Request, res: Response, next: NextFunction);
}
