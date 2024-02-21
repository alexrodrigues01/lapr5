import mongoose from 'mongoose';
import { IComentarioPersistence } from '../../dataschema/IComentarioPersistence';

const Comentario = new mongoose.Schema(
  {
    domainId: {
      type: String,
      unique: true,
    },
    texto: {
      type: String,
      required: [true, 'Por favor introduza o texto do comentario'],
      index: true,
    },

    utilizador: {
      type: String,
      required: [true, 'Por favor introduza o utilizador do comentario'],
      index: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model<IComentarioPersistence & mongoose.Document>('Comentario', Comentario);
