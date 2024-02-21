import { Router } from 'express';
import { Container } from 'typedi';
import config from '../../../config';
import IPostController from '../../controllers/IControllers/IPostController';
import { celebrate, Joi } from 'celebrate';

const route = Router();

export default (app: Router) => {
  app.use('/posts', route);

  const ctrl = Container.get(config.controllers.post.name) as IPostController;

  route.post(
    '',
    celebrate({
      body: Joi.object({
        utilizador: Joi.string().required(),
        texto: Joi.string().required(),
        tags: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.createPost(req, res, next),
  );

  route.get(
    '/postsByUser/:userID',
    celebrate({
      params: Joi.object({
        userID: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.getPostsByUser(req, res, next),
  );

  route.put(
    '/reacao',
    celebrate({
      body: Joi.object({
        valor: Joi.string().required(),
        post: Joi.string().required(),
        userID: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.reacao(req, res, next),
  );
};
