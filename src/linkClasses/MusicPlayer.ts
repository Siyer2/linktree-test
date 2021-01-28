import { ResultStatus } from "../utilities/enums";
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

    generateLink(input: any): string {
        return 'https://syamiyer.com';
    }
}

export {
    MusicPlayer,
    MusicPlatform
}