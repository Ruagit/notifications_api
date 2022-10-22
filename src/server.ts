import express, { Express }  from 'express';
import notificationsRouter from './routes';
import { handle404s, handle405s }  from './errors';

const app: Express = express();

app.use(express.json());
app.use('/notifications', notificationsRouter);

app.use(handle404s);
app.use(handle405s);


export default app;