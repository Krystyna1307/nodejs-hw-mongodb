import { initMongoDB } from './db/initMongoDB.js';
import { setupServer } from './server.js';

//IIDyRBcyc1QrfEfa

const boostrap = async () => {
  await initMongoDB();
  setupServer();
};

boostrap();
