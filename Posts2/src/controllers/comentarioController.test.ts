import * as sinon from 'sinon';

import { Response, Request, NextFunction } from 'express';

import { Container } from 'typedi';
import config from '../../config';

import { Result } from '../core/logic/Result';
import { default as postSchemaInstance } from '../persistence/schemas/postSchema';
import { IPostDTO } from '../dto/IPostDTO';
import { IComentarioDto } from '../dto/IComentarioDto';
import ComentarioController from './comentarioController';
import IComentarioService from '../services/IServices/IComentarioService';
import IPostService from '../services/IServices/IPostService';
import 'reflect-metadata';
import { default as comentarioSchemaInstance } from '../persistence/schemas/comentarioSchema';

describe('post controller', function() {
  beforeEach(function() {});

  it('createComentario: returns json with id+utilizador+texto values', async function() {
    let body = { texto: 'Comentario1', utilizador: 'User1', post: 'Post1' };
    let req: Partial<Request> = {};
    req.body = body;
    let res: Partial<Response> = {
      json: sinon.spy(),
    };
    let next: Partial<NextFunction> = () => {};

    let comentarioSchemaInstance = require('../persistence/schemas/comentarioSchema').default;
    Container.set('comentarioSchema', comentarioSchemaInstance);

    let comentarioRepoClass = require(config.repos.comentario.path).default;
    let comentarioRepoInstance = Container.get(comentarioRepoClass);
    Container.set('ComentarioRepo', comentarioRepoInstance);

    let comentarioServiceClass = require(config.services.comentario.path).default;
    let comentarioServiceInstance = Container.get(comentarioServiceClass);
    Container.set(config.services.comentario.name, comentarioServiceInstance);
    comentarioServiceInstance = Container.get(config.services.comentario.name);
    sinon.stub(comentarioServiceInstance, 'createComentario').returns(
      Result.ok<IComentarioDto>({
        id: '123',
        texto: req.body.texto,
        utilizador: req.body.utilizador,
        post: req.body.post,
      }),
    );

    let postSchemaInstance = require('../persistence/schemas/postSchema').default;
    Container.set('postSchema', postSchemaInstance);

    let postRepoClass = require(config.repos.post.path).default;
    let postRepoInstance = Container.get(postRepoClass);
    Container.set('PostRepo', postRepoInstance);

    let postServiceClass = require(config.services.post.path).default;
    let postServiceInstance = Container.get(postServiceClass);
    Container.set(config.services.post.name, postServiceInstance);
    postServiceInstance = Container.get(config.services.post.name);
    sinon.stub(postServiceInstance, 'addComentario').returns(
      Result.ok<IPostDTO>({
        id: req.body.post,
        utilizador: req.body.utilizador,
        texto: 'texto1',
        tags: 'tag1,tag2,tag3',
        likes: [],
        dislikes: [],
        comentarios: ['123'],
      }),
    );

    const ctrl = new ComentarioController(
      comentarioServiceInstance as IComentarioService,
      postServiceInstance as IPostService,
    );

    await ctrl.createComentario(<Request>req, <Response>res, <NextFunction>next);

    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(
      res.json,
      sinon.match({
        id: '123',
        texto: req.body.texto,
        utilizador: req.body.utilizador,
        post: req.body.post,
      }),
    );
  });

  it('createComentario: returns json with id+utilizador+texto values', async function() {
    let body = { comentarioID: '321' };
    let req: Partial<Request> = {};
    req.params = body;
    let res: Partial<Response> = {
      json: sinon.spy(),
    };
    let next: Partial<NextFunction> = () => {};

    let comentarioSchemaInstance = require('../persistence/schemas/comentarioSchema').default;
    Container.set('comentarioSchema', comentarioSchemaInstance);

    let comentarioRepoClass = require(config.repos.comentario.path).default;
    let comentarioRepoInstance = Container.get(comentarioRepoClass);
    Container.set('ComentarioRepo', comentarioRepoInstance);

    let comentarioServiceClass = require(config.services.comentario.path).default;
    let comentarioServiceInstance = Container.get(comentarioServiceClass);
    Container.set(config.services.comentario.name, comentarioServiceInstance);
    comentarioServiceInstance = Container.get(config.services.comentario.name);
    sinon.stub(comentarioServiceInstance, 'getComentarioByID').returns(
      Result.ok<IComentarioDto>({
        id: req.params.comentarioID,
        texto: 'textoComentario',
        utilizador: 'User1',
        post: 'Post1',
      }),
    );

    let postSchemaInstance = require('../persistence/schemas/postSchema').default;
    Container.set('postSchema', postSchemaInstance);

    let postRepoClass = require(config.repos.post.path).default;
    let postRepoInstance = Container.get(postRepoClass);
    Container.set('PostRepo', postRepoInstance);

    let postServiceClass = require(config.services.post.path).default;
    let postServiceInstance = Container.get(postServiceClass);
    Container.set(config.services.post.name, postServiceInstance);
    postServiceInstance = Container.get(config.services.post.name);

    const ctrl = new ComentarioController(
      comentarioServiceInstance as IComentarioService,
      postServiceInstance as IPostService,
    );

    await ctrl.getComentarioByID(<Request>req, <Response>res, <NextFunction>next);

    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(
      res.json,
      sinon.match({
        id: req.params.comentarioID,
        texto: 'textoComentario',
        utilizador: 'User1',
        post: 'Post1',
      }),
    );
  });
});
