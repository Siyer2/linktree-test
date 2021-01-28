import {
    LinkTypes,
    ResultStatus
} from './enums';

interface Link {
    linkId: String,
    title: String,
    linkType: LinkTypes,
    userId: String,
    dateCreated: Date,
    linkSpecificData?: any
}

interface LinkType {
    validate: (input: any) => {
        result: ResultStatus,
        error?: string,
    };

    generateLink: (input: any, userId: string) => string;
}

export {
    LinkType,
    Link
}