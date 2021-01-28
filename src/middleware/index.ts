import {
    Request,
    Response,
    NextFunction
} from 'express';
import { Classic } from '../linkClasses/Classic';
import { ShowsList } from '../linkClasses/ShowsList';
import { ResultStatus } from '../utilities/enums';

enum LinkType {
    Classic,
    ShowsList,
    MusicPlayer
}

/**
 * Middleware to determine whether the input is valid
 * @param request 
 * @param response 
 * @param next 
 */
const validateInputs = function (request: Request, response: Response, next: NextFunction) {
    const linkType: number = request.body.linkType;
    const linkSpecificData: any = request.body.linkSpecificData;

    let validationResponse: { result: ResultStatus; error?: String } | null = null;

    switch (linkType) {
        case LinkType.Classic:
            let classicLink = new Classic();
            validationResponse = classicLink.validate(linkSpecificData);
            break;
        case LinkType.ShowsList:
            let showsListLink = new ShowsList();
            validationResponse = showsListLink.validate(linkSpecificData);
            break;
        case 2:

            break;

        default:
            break;
    }

    if (!validationResponse || validationResponse.result == ResultStatus.Failure) {
        return response.status(400).send(validationResponse ? validationResponse.error : 'Error with input');
    }
    else if (validationResponse.result == ResultStatus.Success) {
        next();
    }
}

export {
    validateInputs
}