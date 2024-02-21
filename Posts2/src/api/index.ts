import { Router } from 'express';
import auth from './routes/userRoute';
import user from './routes/userRoute';
import role from './routes/roleRoute';
import posts from './routes/postRoute';
import comentario from './routes/comentarioRoute';

export default () => {
  const app = Router();

  auth(app);
  user(app);
  role(app);
  posts(app);
  comentario(app);

  return app;
};
