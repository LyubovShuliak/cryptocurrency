import http from 'http';
import config from 'config';

import { app } from './app';
import { PubSub } from './services/PubSub';
import { Blockchain } from './models/Blockchain';

export const blockchain = new Blockchain();
export const pubsub = new PubSub(blockchain);

const PORT = config.get('configDefault.port');
const server = http.createServer(app);

async function startServer() {
  await pubsub.connect();
  server.listen(PORT, () => {
    console.log(`Listening to the port ${PORT}`);
  });
}

startServer();
