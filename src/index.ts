import http from 'http';
import config from 'config';

import { app } from './app';

const PORT = config.get('configDefault.port');
const server = http.createServer(app);

async function startServer() {
  server.listen(PORT, () => {
    console.log(`Listening to the port ${PORT}`);
  });
}

startServer();
