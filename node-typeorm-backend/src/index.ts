require('dotenv').config();

import bodyParser from 'body-parser';
import express from 'express';
import { ConnectionOptions, createConnection } from 'typeorm';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import connectionConfig from '../ormconfig';

createConnection({
  ...connectionConfig as ConnectionOptions,
  entities: [__dirname + '/../**/**.entity']
})
  .catch(error => console.log(error));

import routes from './routes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running here: http://localhost:${process.env.PORT}`);
});
