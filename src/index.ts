import express, { Request, Response } from 'express';
import { validateInputs } from './middleware';
import { generateLink } from '../src/helperFunctions/linkGenerator';
import bodyParser from 'body-parser';
const app = express();
const port = 8080;

app.use(bodyParser.json({ strict: false }));

// TODO: Move endpoints out of the index file
// TODO: Write a sign up/sign in endpoint using JWT. Get the user ID from the bearer token rather than as a body param
app.post('/generateLink', validateInputs, (request: Request, response: Response) => {
    try {
        const linkType: number = request.body.linkType;
        const linkSpecificData: any = request.body.linkSpecificData;
        const userId: string = request.body.userId;

        let link = generateLink(linkType, linkSpecificData, userId);
        return response.send(link);
    } catch (error) {
        return response.status(500).json({ error });
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});