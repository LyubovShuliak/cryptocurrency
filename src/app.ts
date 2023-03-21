import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';

import httpContext from 'express-http-context';
import { nanoid } from 'nanoid';
import { chainRouter } from './routes/chain/chain.router';
import { PubSub } from './services/PubSub';
export const app = express();

app.set('trust proxy', 1);

app.use(cors({ origin: '*' }));
app.use(helmet());

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(httpContext.middleware);

app.use((req, res, next) => {
  req.id = nanoid();
  if (req.id) {
    httpContext.set('requestId', req.id);
  }

  next();
});
app.use('/api', chainRouter);
