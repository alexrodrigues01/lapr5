import { expect } from 'chai';
import { Post } from './post';
import assert from 'assert';
import { Result } from '../core/logic/Result';
import { IPostDTO } from '../dto/IPostDTO';

describe('Test post class', () => {
  it('Post create with valid arguments', () => {
    const props = {
      utilizador: 'user1',
      texto: 'texto1',
      tags: ['tag1', 'tag2', 'tag3'],
      likes: [],
      dislikes: [],
      comentarios: [],
    };
    const result = Post.create(props);
    assert(result.getValue().utilizador === 'user1');
    assert(result.getValue().texto === 'texto1');
    assert(result.getValue().tags[0] === 'tag1');
    assert(result.getValue().tags[1] === 'tag2');
    assert(result.getValue().tags[2] === 'tag3');
  });

  it('Cannot create a post without user', () => {
    const expected = Result.fail<Post>('Tem que introduzir o utilizador que fez o post');
    const postDto = {
      utilizador: '',
      texto: 'texto1',
      tags: 'tag1, tag2, tag3',
      likes: [],
      dislikes: [],
      comentarios: [],
    } as IPostDTO;
    const result = Post.create2(postDto);

    assert(result.error === expected.error);
  });

  it('Cannot create a post without text', () => {
    const expected = Result.fail<Post>('Tem que introduzir o texto do post');
    const postDto = {
      utilizador: 'user1',
      texto: '',
      tags: 'tag1, tag2, tag3',
      likes: [],
      dislikes: [],
      comentarios: [],
    } as IPostDTO;
    const result = Post.create2(postDto);

    console.log(result.error);
    assert(result.error === expected.error);
  });

  it('Post create with valid dto', () => {
    const postDto = {
      utilizador: 'user1',
      texto: 'texto1',
      tags: 'tag1, tag2, tag3',
      likes: [],
      dislikes: [],
      comentarios: [],
    } as IPostDTO;
    const result = Post.create2(postDto);
    assert(result.getValue().utilizador === 'user1');
    assert(result.getValue().texto === 'texto1');
    assert(result.getValue().tags[0] === 'tag1');
    assert(result.getValue().tags[1].toString() === ' tag2');
    assert(result.getValue().tags[2].toString() === ' tag3');
  });
});
