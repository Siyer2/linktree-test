import express, { Request, Response } from 'express';
import { validateInputs } from './middleware';
import bodyParser from 'body-parser';
const app = express();
const port = 8080;

app.use(bodyParser.json({ strict: false }));

// TODO: Move endpoints out of the index file
app.post('/generateLink', validateInputs, (request: Request, response: Response) => {
    try {
        return response.send('done');
    } catch (error) {
        return response.status(500).json({ error });
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});

export {
    app
}