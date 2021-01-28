import { getRandomId } from "../helperFunctions";
import { LinkTypes, ResultStatus } from "../utilities/enums";
import { Link } from "../utilities/interfaces";
import { Classic } from "./Classic";

enum MusicPlatform {
    Spotify,
    AppleMusic,
}

class MusicPlayer extends Classic {
    /**
     * Determine whether a MusicPlayer link can be generated with the given input
     * @param input - linkSpecificData that comes from the request body
     */
    validate(input: any): { result: ResultStatus; error?: string } {
        // Check that the show status is there
        let classicValidation = super.validate(input);
        if (classicValidation.result == ResultStatus.Failure) {
            return classicValidation;
        }

        // Check that the linked platform is supported
        if (![MusicPlatform.Spotify, MusicPlatform.AppleMusic].includes(input.musicPlatform)) {
            return {
                result: ResultStatus.Failure,
                error: "Unsupported music platform"
            };
        }

        return {
            result: ResultStatus.Success
        };
    }

    /**
     * Generate a new link
     * @param input 
     * @param userId 
     */
    generateLink(input: any, userId: string): string {
        const linkId = getRandomId();
        let newLink: Link = {
            linkId: linkId,
            userId: userId,
            dateCreated: new Date(),
            linkType: LinkTypes.MusicPlayer,
            title: input.title,
            linkSpecificData: {
                musicPlatform: input.musicPlatform
            }
        };
        console.log('Creating link', newLink);
        // TODO: Upload newLink to a storage

        return `${this.baseURL}?linkId=${linkId}`;
    }
}

export {
    MusicPlayer,
    MusicPlatform
}