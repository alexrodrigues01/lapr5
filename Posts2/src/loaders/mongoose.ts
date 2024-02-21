import mongoose from 'mongoose';
import { Db } from 'mongodb';
import config from '../../config';

export default async (): Promise<Db> => {
  const connection = await mongoose.connect('mongodb://vs818.dei.isep.ipp.pt:27017/admin', {
    user: 'mongoadmin',
    pass: 'b0e0e8202e1a0be3ed86cc7d',
  });
  return connection.connection.db;
};