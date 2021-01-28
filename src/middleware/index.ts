import {
    Request,
    Response,
    NextFunction
} from 'express';
import { Classic } from '../linkClasses/Classic';
import { ShowsList } from '../linkClasses/ShowsList';
import { MusicPlayer } from '../linkClasses/MusicPlayer';
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

    let validationResponse: { result: ResultStatus; error?: String } = {
        result: ResultStatus.Failure,
        error: 'Invalid linkType'
    };

    switch (linkType) {
        case LinkType.Classic:
            let classicLink = new Classic();
            validationResponse = classicLink.validate(linkSpecificData);
            break;

        case LinkType.ShowsList:
            let showsListLink = new ShowsList();
            validationResponse = showsListLink.validate(linkSpecificData);
            break;

        case LinkType.MusicPlayer:
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