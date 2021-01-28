import {
    ResultStatus
} from './enums';

interface LinkType {
    validate: (input: any) => {
        result: ResultStatus,
        error?: String,
    };

    generateLink: (input: any) => String;
}

export {
    LinkType
}