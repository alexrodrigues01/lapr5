import { Inject, Service } from 'typedi';
import IComentarioRepo from '../services/IRepos/IComentarioRepo';
import { Document, Model } from 'mongoose';
import { IUserPersistence } from '../dataschema/IUserPersistence';
import { IComentarioPersistence } from '../dataschema/IComentarioPersistence';
import { ComentarioId } from '../domain/comentarioId';
import { UserId } from '../domain/userId';
import { User } from '../domain/user';
import { UserMap } from '../mappers/UserMap';
import { Comentario } from '../domain/comentario';
import { ComentarioMap } from '../mappers/ComentarioMap';

@Service()
export default class ComentarioRepo implements IComentarioRepo {
  private models: any;

  constructor(
    @Inject('comentarioSchema') private comentarioSchema: Model<IComentarioPersistence & Document>,
  ) {}

  private createBaseQuery(): any {
    return {
      where: {},
    };
  }

  public async exists(comentarioId: ComentarioId | string): Promise<boolean> {
    const idX = comentarioId instanceof ComentarioId ? (<ComentarioId>comentarioId).id.toValue() : comentarioId;

    const query = { domainId: idX };
    const userDocument = await this.comentarioSchema.findOne(query);

    return !!userDocument === true;
  }

  public async save(comentario: Comentario): Promise<Comentario> {
    const query = { domainId: comentario.id.toString() };

    const comentarioDocument = await this.comentarioSchema.findOne(query);

    try {
      if (comentarioDocument === null) {
        const rawComentario: any = ComentarioMap.toPersistence(comentario);

        const comentarioCreated = await this.comentarioSchema.create(rawComentario);

        return ComentarioMap.toDomain(comentarioCreated);
      } else {
        comentarioDocument.utilizador = comentario.utilizador;
        comentarioDocument.texto = comentario.texto;
        await comentarioDocument.save();

        return comentario;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findById(comentarioId: ComentarioId | string): Promise<Comentario> {
    const idX = comentarioId instanceof ComentarioId ? (<ComentarioId>comentarioId).id.toValue() : comentarioId;

    const query = { domainId: idX };
    const comentarioRecord = await this.comentarioSchema.findOne(query);

    if (comentarioRecord != null) {
      return ComentarioMap.toDomain(comentarioRecord);
    } else return null;
  }
}
