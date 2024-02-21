import * as sinon from 'sinon';

import { Response, Request, NextFunction } from 'express';

import { Container } from 'typedi';
import config from '../../config';

import { Result } from '../core/logic/Result';
import 'reflect-metadata';
import { IPostDTO } from '../dto/IPostDTO';
import { default as postSchemaInstance } from '../persistence/schemas/postSchema';
import { Post } from '../domain/post';
import PostService from './postService';
import IPostRepo from './IRepos/IPostRepo';
import assert from 'assert';
import { IComentarioDto } from '../dto/IComentarioDto';

describe('post service', function() {
  beforeEach(function() {});

  it('createPost: returns dto with id+utilizador+texto+tags values', async function() {
    let postDto = {
      id: '123',
      utilizador: 'user1',
      texto: 'texto1',
      tags: 'tags1,tags2,tags3',
      likes: [],
      dislikes: [],
      comentarios: [],
    } as IPostDTO;

    let postFind = Post.create2(postDto);
    let comentariosId = postFind.getValue().comentarios;
    comentariosId.push('user1');
    postFind.getValue().comentarios = comentariosId;

    let postSchemaInstance = require('../persistence/schemas/postSchema').default;
    Container.set('postSchema', postSchemaInstance);

    let postRepoClass = require(config.repos.post.path).default;
    let postRepoInstance = Container.get(postRepoClass);
    Container.set('PostRepo', postRepoInstance);
    postRepoInstance = Container.get(config.repos.post.name);
    sinon.stub(postRepoInstance, 'save').returns(postFind);

    const service = new PostService(postRepoInstance as IPostRepo);
    const result = await service.createPost(postDto);
    const expected = postFind;

    assert(expected.getValue().texto === result.getValue().texto);
    assert(expected.getValue().utilizador === result.getValue().utilizador);
    assert(expected.getValue().tags[0] === result.getValue().tags.split(',')[0]);
  });

  it('addComentario: returns dto of post with utilizador+comentario values', async function() {
    let comentarioDto = {
      id: '123',
      utilizador: 'user1',
      texto: 'texto1',
      post: 'post1',
    } as IComentarioDto;

    let postDto = {
      id: '123',
      utilizador: 'user1',
      texto: 'texto1',
      tags: 'tags1,tags2,tags3',
      likes: [],
      dislikes: [],
      comentarios: ['user2'],
    } as IPostDTO;

    let postDtoWithComment = {
      id: '123',
      utilizador: 'user1',
      texto: 'texto1',
      tags: 'tags1,tags2,tags3',
      likes: [],
      dislikes: [],
      comentarios: ['user1'],
    } as IPostDTO;

    let postFind = Post.create2(postDto);
    let comentariosId = postFind.getValue().comentarios;
    comentariosId.push('user1');
    postFind.getValue().comentarios = comentariosId;

    let postSchemaInstance = require('../persistence/schemas/postSchema').default;
    Container.set('postSchema', postSchemaInstance);

    let postRepoClass = require(config.repos.post.path).default;
    let postRepoInstance = Container.get(postRepoClass);
    Container.set('PostRepo', postRepoInstance);
    postRepoInstance = Container.get(config.repos.post.name);
    sinon.stub(postRepoInstance, 'findById').returns(postFind.getValue());
    // sinon.stub(postRepoInstance, 'save').returns(postFind.getValue());

    const service = new PostService(postRepoInstance as IPostRepo);
    const result = await service.addComentario(comentarioDto, comentarioDto);
    const expected = postFind;

    assert(expected.getValue().texto === result.getValue().texto);
    assert(expected.getValue().utilizador === result.getValue().utilizador);
    assert(expected.getValue().tags[0] === result.getValue().tags.split(',')[0]);
    assert(expected.getValue().comentarios[0] === result.getValue().comentarios[0]);
  });

  it('getPostsByUser: returns list of dtos of posts with utilizador values', async function() {
    let comentarioDto = {
      id: '123',
      utilizador: 'user1',
      texto: 'texto1',
      post: 'post1',
    } as IComentarioDto;

    let postDto = {
      id: '123',
      utilizador: 'user1',
      texto: 'texto1',
      tags: 'tags1,tags2,tags3',
      likes: [],
      dislikes: [],
      comentarios: ['user2'],
    } as IPostDTO;

    let postDtoWithComment = {
      id: '123',
      utilizador: 'user1',
      texto: 'texto1',
      tags: 'tags1,tags2,tags3',
      likes: [],
      dislikes: [],
      comentarios: ['user1'],
    } as IPostDTO;

    let postFind = Post.create2(postDto);
    let comentariosId = postFind.getValue().comentarios;
    comentariosId.push('user1');
    postFind.getValue().comentarios = comentariosId;

    let lista = [postFind.getValue()];

    let postSchemaInstance = require('../persistence/schemas/postSchema').default;
    Container.set('postSchema', postSchemaInstance);

    let postRepoClass = require(config.repos.post.path).default;
    let postRepoInstance = Container.get(postRepoClass);
    Container.set('PostRepo', postRepoInstance);
    postRepoInstance = Container.get(config.repos.post.name);
    sinon.stub(postRepoInstance, 'findByUtilizador').returns(lista);

    const service = new PostService(postRepoInstance as IPostRepo);
    const result = await service.getPostsByUser(postDto.id);
    const expected = Post.create2(postDtoWithComment);

    assert(expected.getValue().texto === result.getValue()[0].texto);
    assert(expected.getValue().utilizador === result.getValue()[0].utilizador);
    // assert(expected.getValue().tags[0] === result.getValue().tags.split(',')[0]);
    // assert(expected.getValue().comentarios[0] === result.getValue().comentarios[0]);
  });

  it('reacao: returns dto of post with utilizador+like/dislike values', async function() {
    let comentarioDto = {
      id: '123',
      utilizador: 'user1',
      texto: 'texto1',
      post: 'post1',
    } as IComentarioDto;

    let postDto = {
      id: '123',
      utilizador: 'user1',
      texto: 'texto1',
      tags: 'tags1,tags2,tags3',
      likes: [],
      dislikes: [],
      comentarios: ['user2'],
    } as IPostDTO;

    let postDtoWithComment = {
      id: '123',
      utilizador: 'user1',
      texto: 'texto1',
      tags: 'tags1,tags2,tags3',
      likes: [],
      dislikes: [],
      comentarios: ['user1'],
    } as IPostDTO;

    let postFind = Post.create2(postDto);
    let comentariosId = postFind.getValue().comentarios;
    comentariosId.push('user1');
    postFind.getValue().comentarios = comentariosId;

    let postFind2 = postFind;
    let likesId = postFind2.getValue().likes;
    likesId.push('user1');
    postFind2.getValue().likes = likesId;

    let postSchemaInstance = require('../persistence/schemas/postSchema').default;
    Container.set('postSchema', postSchemaInstance);

    let postRepoClass = require(config.repos.post.path).default;
    let postRepoInstance = Container.get(postRepoClass);
    Container.set('PostRepo', postRepoInstance);
    postRepoInstance = Container.get(config.repos.post.name);
    // sinon.stub(postRepoInstance, 'findById').returns(postFind.getValue());
    // sinon.stub(postRepoInstance, 'save').returns(postFind.getValue());

    const service = new PostService(postRepoInstance as IPostRepo);
    const result = await service.reacao('post1', 'user1', '1');
    const expected = postFind;

    assert(expected.getValue().texto === result.getValue().texto);
    assert(expected.getValue().utilizador === result.getValue().utilizador);
    assert(expected.getValue().tags[0] === result.getValue().tags.split(',')[0]);
    assert(expected.getValue().comentarios[0] === result.getValue().comentarios[0]);
  });
});
