import { Router } from 'express';
import { Container } from 'typedi';
import config from '../../../config';
import IPostController from '../../controllers/IControllers/IPostController';
import { celebrate, Joi } from 'celebrate';
import IComentarioController from '../../controllers/IControllers/IComentarioController';

const route = Router();

export default (app: Router) => {
  app.use('/comentarios', route);

  const ctrl = Container.get(config.controllers.comentario.name) as IComentarioController;

  route.post(
    '',
    celebrate({
      body: Joi.object({
        texto: Joi.string().required(),
        utilizador: Joi.string().required(),
        post: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.createComentario(req, res, next),
  );

  route.get(
    '/comentarioById/:comentarioID',
    celebrate({
      params: Joi.object({
        comentarioID: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.getComentarioByID(req, res, next),
  );
};
