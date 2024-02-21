import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import Logger from './logger';

import config from '../../config';

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');

  const userSchema = {
    // compare with the approach followed in repos and services
    name: 'userSchema',
    schema: '../persistence/schemas/userSchema',
  };

  const roleSchema = {
    // compare with the approach followed in repos and services
    name: 'roleSchema',
    schema: '../persistence/schemas/roleSchema',
  };

  const postSchema = {
    name: 'postSchema',
    schema: '../persistence/schemas/postSchema',
  };

  const comentarioSchema = {
    name: 'comentarioSchema',
    schema: '../persistence/schemas/comentarioSchema',
  };

  const roleController = {
    name: config.controllers.role.name,
    path: config.controllers.role.path,
  };

  const roleRepo = {
    name: config.repos.role.name,
    path: config.repos.role.path,
  };

  const userRepo = {
    name: config.repos.user.name,
    path: config.repos.user.path,
  };

  const roleService = {
    name: config.services.role.name,
    path: config.services.role.path,
  };

  const postController = {
    name: config.controllers.post.name,
    path: config.controllers.post.path,
  };

  const postService = {
    name: config.services.post.name,
    path: config.services.post.path,
  };

  const postRepo = {
    name: config.repos.post.name,
    path: config.repos.post.path,
  };

  const comentarioController = {
    name: config.controllers.comentario.name,
    path: config.controllers.comentario.path,
  };

  const comentarioService = {
    name: config.services.comentario.name,
    path: config.services.comentario.path,
  };

  const comentarioRepo = {
    name: config.repos.comentario.name,
    path: config.repos.comentario.path,
  };

  await dependencyInjectorLoader({
    mongoConnection,
    schemas: [userSchema, roleSchema, postSchema, comentarioSchema],
    controllers: [roleController, postController, comentarioController],
    repos: [roleRepo, userRepo, postRepo, comentarioRepo],
    services: [roleService, postService, comentarioService],
  });
  Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
