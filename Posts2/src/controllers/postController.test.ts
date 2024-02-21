import * as sinon from 'sinon';

import { Response, Request, NextFunction } from 'express';

import { Container } from 'typedi';
import config from '../../config';

import { Result } from '../core/logic/Result';
import { default as roleSchemaInstance } from '../persistence/schemas/roleSchema';
import { IPostDTO } from '../dto/IPostDTO';
import PostController from './postController';
import IPostService from '../services/IServices/IPostService';
import 'reflect-metadata';
import { default as postSchemaInstance } from '../persistence/schemas/postSchema';

describe('post controller', function() {
  beforeEach(function() {});

  it('createPost: returns json with id+utilizador+texto+tags values', async function() {
    let body = { utilizador: 'user1', texto: 'post1', tags: 'tag1,tag2,tag3' };
    let req: Partial<Request> = {};
    req.body = body;

    let res: Partial<Response> = {
      json: sinon.spy(),
    };
    let next: Partial<NextFunction> = () => {};

    let postSchemaInstance = require('../persistence/schemas/postSchema').default;
    Container.set('postSchema', postSchemaInstance);

    let postRepoClass = require(config.repos.post.path).default;
    let postRepoInstance = Container.get(postRepoClass);
    Container.set('PostRepo', postRepoInstance);

    let postServiceClass = require(config.services.post.path).default;
    let postServiceInstance = Container.get(postServiceClass);
    Container.set(config.services.post.name, postServiceInstance);
    postServiceInstance = Container.get(config.services.post.name);
    sinon.stub(postServiceInstance, 'createPost').returns(
      Result.ok<IPostDTO>({
        id: '123',
        utilizador: req.body.utilizador,
        texto: req.body.texto,
        tags: req.body.tags,
        likes: [],
        dislikes: [],
        comentarios: [],
      }),
    );

    const ctrl = new PostController(postServiceInstance as IPostService);
    await ctrl.createPost(<Request>req, <Response>res, <NextFunction>next);

    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(
      res.json,
      sinon.match({
        id: '123',
        utilizador: req.body.utilizador,
        texto: req.body.texto,
        tags: req.body.tags,
        likes: [],
        dislikes: [],
        comentarios: [],
      }),
    );
  });

  it('getPostsByUser: returns json with posts with user values', async function() {
    let body = { userID: 'user1' };
    let req: Partial<Request> = {};
    req.params = body;

    let res: Partial<Response> = {
      json: sinon.spy(),
    };
    let next: Partial<NextFunction> = () => {};

    let postSchemaInstance = require('../persistence/schemas/postSchema').default;
    Container.set('postSchema', postSchemaInstance);

    let postRepoClass = require(config.repos.post.path).default;
    let postRepoInstance = Container.get(postRepoClass);
    Container.set('PostRepo', postRepoInstance);

    let postServiceClass = require(config.services.post.path).default;
    let postServiceInstance = Container.get(postServiceClass);
    Container.set(config.services.post.name, postServiceInstance);
    postServiceInstance = Container.get(config.services.post.name);
    let post = {
      id: '123',
      utilizador: req.params.userID,
      texto: 'post1',
      tags: 'tag1,tag2,tag3',
      likes: [],
      dislikes: [],
      comentarios: [],
    } as IPostDTO;

    let result = [post];
    sinon.stub(postServiceInstance, 'getPostsByUser').returns(Result.ok<IPostDTO[]>(result));

    const ctrl = new PostController(postServiceInstance as IPostService);
    await ctrl.getPostsByUser(<Request>req, <Response>res, <NextFunction>next);

    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match(result));

  });

  it('adicionar: returns json with post values', async function() {
    let body = { valor: '1', post: '123', userID: 'user1' };
    let req: Partial<Request> = {};
    req.body = body;

    let res: Partial<Response> = {
      json: sinon.spy(),
    };
    let next: Partial<NextFunction> = () => {};

    let postSchemaInstance = require('../persistence/schemas/postSchema').default;
    Container.set('postSchema', postSchemaInstance);

    let postRepoClass = require(config.repos.post.path).default;
    let postRepoInstance = Container.get(postRepoClass);
    Container.set('PostRepo', postRepoInstance);

    let postServiceClass = require(config.services.post.path).default;
    let postServiceInstance = Container.get(postServiceClass);
    Container.set(config.services.post.name, postServiceInstance);
    postServiceInstance = Container.get(config.services.post.name);
    sinon.stub(postServiceInstance, 'reacao').returns(
      Result.ok<IPostDTO>({
        id: req.body.post,
        utilizador: req.body.userID,
        texto: 'post1',
        tags: 'tag1,tag2,tag3',
        likes: ['user1'],
        dislikes: [],
        comentarios: [],
      }),
    );

    const ctrl = new PostController(postServiceInstance as IPostService);
    await ctrl.reacao(<Request>req, <Response>res, <NextFunction>next);

    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(
      res.json,
      sinon.match({
        id: req.body.post,
        utilizador: req.body.userID,
        texto: 'post1',
        tags: 'tag1,tag2,tag3',
        likes: ['user1'],
        dislikes: [],
        comentarios: [],
      }),
    );
  });
});
