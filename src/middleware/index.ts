import {
    Request,
    Response,
    NextFunction
} from 'express';
import { Classic } from '../linkClasses/Classic';
import { ShowsList } from '../linkClasses/ShowsList';
import { MusicPlayer } from '../linkClasses/MusicPlayer';
import { ResultStatus, LinkTypes } from '../utilities/enums';

/**
 * Middleware to determine whether the input is valid
 * @param request 
 * @param response 
 * @param next 
 */
const validateInputs = function (request: Request, response: Response, next: NextFunction) {
    // Ensure the userId is in the body
    if (!request.body.userId) {
        return response.status(400).send('userId is a required parameter');
    }

    // Validate the other inputs
    const linkType: number = request.body.linkType;
    const linkSpecificData: any = request.body.linkSpecificData;

    let validationResponse: { result: ResultStatus; error?: String } = {
        result: ResultStatus.Failure,
        error: 'Invalid linkType'
    };

    switch (linkType) {
        case LinkTypes.Classic:
            let classicLink = new Classic();
            validationResponse = classicLink.validate(linkSpecificData);
            break;

        case LinkTypes.ShowsList:
            let showsListLink = new ShowsList();
            validationResponse = showsListLink.validate(linkSpecificData);
            break;

        case LinkTypes.MusicPlayer:
            let musicPlayerLink = new MusicPlayer();
            validationResponse = musicPlayerLink.validate(linkSpecificData);
            break;

        default:
            break;
    }

    if (validationResponse.result == ResultStatus.Failure) {
        return response.status(400).send(validationResponse.error);
    }
    else if (validationResponse.result == ResultStatus.Success) {
        next();
    }
}

export {
    validateInputs
}