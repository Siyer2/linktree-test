import {
    Request,
    Response,
    NextFunction
} from 'express';

const validateInputs = function (request: Request, response: Response, next: NextFunction) {
    console.log("here");
    const linkType: number = request.body.linkType;
    const linkSpecificData: any = request.body.linkSpecificData;

    switch (linkType) {
        case 0:
            console.log('hit classic with linkSpecificData', linkSpecificData);
            break;
        case 1:

            break;
        case 2:

            break;

        default:
            break;
    }

    return response.status(400).send('Error with input');
}

export {
    validateInputs
}