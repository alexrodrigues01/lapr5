import assert from 'assert';
import { Result } from '../core/logic/Result';
import { Comentario } from './comentario';
import {IComentarioDto} from "../dto/IComentarioDto";
describe('Test comentario class', () => {
  it('Post create with valid arguments', () => {
    const props = {
      texto: 'textoComentario',
      utilizador: 'utilizador1',
    };
    const result = Comentario.create(props);
    assert(result.getValue().texto === 'textoComentario');
    assert(result.getValue().utilizador === 'utilizador1');
  });


  it('Post create with valid arguments', () => {
    const props = {
      texto: 'textoComentario',
      utilizador: 'utilizador1',
    } as IComentarioDto;
    const result = Comentario.create(props);
    assert(result.getValue().texto === 'textoComentario');
    assert(result.getValue().utilizador === 'utilizador1');
  });
});
