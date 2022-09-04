import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import routes from './routes';
import handelError from './handlers/handelError';
import cookieParser from 'cookie-parser';
// import fs from 'fs';
import path from 'path';

const app: Application = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/api', routes);
app.use(handelError);

app.get('/', (req: Request, res: Response) => {
    // res.json({ message: 'Hello from basic endpoint🤩' });
    res.sendFile(path.join(__dirname, '../README.md'))
});

app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port} 😀`);
});

export default app;
