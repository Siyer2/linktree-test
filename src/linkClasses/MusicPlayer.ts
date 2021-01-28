import { getRandomId } from "../helperFunctions";
import { LinkTypes, ResultStatus } from "../utilities/enums";
import { Link } from "../utilities/interfaces";
import { Classic } from "./Classic";

enum MusicPlatform {
    Spotify,
    AppleMusic,
}

interface SongLink {
    platform: MusicPlatform,
    platformLink: string
}

interface MusicLink extends Link {
    songLinks: SongLink[]
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

        // Ensure that the songLinks parameter is there
        if (!input.songLinks || !Array.isArray(input.songLinks) || input.songLinks.length === 0) {
            return {
                result: ResultStatus.Failure,
                error: "A non-empty 'songLinks' array is a required parameter when creating a MusicPlayer link"
            };
        }

        // Loop through each song link and ensure that it is valid
        let error = "";
        input.songLinks.forEach((songLink: any) => {
            if (![MusicPlatform.Spotify, MusicPlatform.AppleMusic].includes(songLink.platform)
                || (!songLink.platformLink)) {
                error = songLink;
            };
        });
        if (error) {
            return {
                result: ResultStatus.Failure,
                error: `Invalid songLink: ${JSON.stringify(error)}`
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
        let newLink: MusicLink = {
            linkId: linkId,
            userId: userId,
            dateCreated: new Date(),
            linkType: LinkTypes.MusicPlayer,
            title: input.title,
            songLinks: input.songLinks
        }

        console.log('Creating link', newLink);
        // TODO: Upload newLink to a storage

        return `${this.baseURL}?linkId=${linkId}`;
    }
}

export {
    MusicPlayer,
    MusicPlatform
}