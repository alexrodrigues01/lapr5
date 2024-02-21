import { IPostPersistence } from '../../dataschema/IPostPersistence';
import mongoose from 'mongoose';

const Post = new mongoose.Schema(
  {
    domainId: {
      type: String,
      unique: true,
    },

    utilizador: {
      type: String,
      required: [true, 'Por favor introduza o jogador do post'],
      index: true,
    },

    texto: {
      type: String,
      required: [true, 'Por favor introduza o texto do post'],
      index: true,
    },

    tags: { type: Array, default: [] },

    likes: { type: Array, default: [] },

    dislikes: { type: Array, default: [] },

    comentarios: { type: Array, default: [] },
  },
  { timestamps: true },
);

export default mongoose.model<IPostPersistence & mongoose.Document>('Post', Post);
