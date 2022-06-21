/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import { addUserRoutes } from './app/routes/user';
import * as dbConfig from './app/config/database';
import * as cors from "cors";
import { addArticleRoutes } from './app/routes/article';

dbConfig.connect();

const app = express();
app.use(cors());
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api!' });
});

addUserRoutes(app);
addArticleRoutes(app);

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
