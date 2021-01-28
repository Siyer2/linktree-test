import { Classic } from '../linkClasses/Classic';
import { MusicPlayer } from '../linkClasses/MusicPlayer';
import { ShowsList } from '../linkClasses/ShowsList';
import { LinkTypes } from '../utilities/enums';

const generateLink = function (linkType: LinkTypes, linkSpecificData: any, userId: string): string {
    let link = '';

    switch (linkType) {
        case LinkTypes.Classic:
            let classicLink = new Classic();
            link = classicLink.generateLink(linkSpecificData, userId);
            break;

        case LinkTypes.ShowsList:
            let showsListLink = new ShowsList();
            link = showsListLink.generateLink(linkSpecificData, userId);
            break;

        case LinkTypes.MusicPlayer:
            let musicPlayerLink = new MusicPlayer();
            link = musicPlayerLink.generateLink(linkSpecificData, userId);
            break;

        default:
            break;
    }

    return link;
};

export {
    generateLink
}