import {
    ResultStatus
} from './enums';

interface LinkType {
    validation: (input: any) => {
        result: ResultStatus,
        message?: String,
    };

    generateLink: (input: any) => String;
}

export {
    LinkType
}