import * as sinon from 'sinon';

import { Response, Request, NextFunction } from 'express';

import { Container } from 'typedi';
import config from '../../config';

import { Result } from '../core/logic/Result';
import 'reflect-metadata';
import { default as postSchemaInstance } from '../persistence/schemas/postSchema';
import ComentarioService from './comentarioService';
import IComentarioRepo from './IRepos/IComentarioRepo';
import { IComentarioDto } from '../dto/IComentarioDto';
import { Comentario } from '../domain/comentario';
import assert from 'assert';

describe('comentario service', function() {
  beforeEach(function() {});
  it('createPost: returns dto with id+utilizador+texto+tags values', async function() {
    let comentarioDto = {
      id: '123',
      utilizador: 'user1',
      texto: 'texto1',
      post: 'post1',
    } as IComentarioDto;

    let postSchemaInstance = require('../persistence/schemas/comentarioSchema').default;
    Container.set('comentarioSchema', postSchemaInstance);

    let comentarioRepoClass = require(config.repos.comentario.path).default;
    let comentarioRepoInstance = Container.get(comentarioRepoClass);
    Container.set('ComentarioRepo', comentarioRepoInstance);
    comentarioRepoInstance = Container.get(config.repos.comentario.name);
    sinon.stub(comentarioRepoInstance, 'save').returns(Comentario.create(comentarioDto).getValue());

    const service = new ComentarioService(comentarioRepoInstance as IComentarioRepo);
    const result = await service.createComentario(comentarioDto);
    const expected = Comentario.create(comentarioDto).getValue();

    assert(expected.texto === result.getValue().texto);
    assert(expected.utilizador === result.getValue().utilizador);
  });

  it('createPost: returns dto with id+utilizador+texto+tags values', async function() {
    let comentarioDto = {
      id: '123',
      utilizador: 'user1',
      texto: 'texto1',
      post: 'post1',
    } as IComentarioDto;

    let postSchemaInstance = require('../persistence/schemas/comentarioSchema').default;
    Container.set('comentarioSchema', postSchemaInstance);

    let comentarioRepoClass = require(config.repos.comentario.path).default;
    let comentarioRepoInstance = Container.get(comentarioRepoClass);
    Container.set('ComentarioRepo', comentarioRepoInstance);
    comentarioRepoInstance = Container.get(config.repos.comentario.name);
    sinon.stub(comentarioRepoInstance, 'findById').returns(Comentario.create(comentarioDto).getValue());

    const service = new ComentarioService(comentarioRepoInstance as IComentarioRepo);
    const result = await service.getComentarioByID(comentarioDto.id);
    const expected = Comentario.create(comentarioDto).getValue();

    assert(expected.texto === result.getValue().texto);
    assert(comentarioDto.id, result.getValue().id);
  });
});
