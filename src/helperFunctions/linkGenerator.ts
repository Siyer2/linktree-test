import { Classic } from '../linkClasses/Classic';
import { LinkTypes } from '../utilities/enums';

const generateLink = function (linkType: LinkTypes, linkSpecificData: any, userId: string): string {
    let link = '';

    switch (linkType) {
        case LinkTypes.Classic:
            let classicLink = new Classic();
            link = classicLink.generateLink(linkSpecificData, userId);
            break;

        default:
            break;
    }

    return link;
};

export {
    generateLink
}