import { ResultStatus } from "../utilities/enums";
import { LinkType } from "../utilities/interfaces";

class Classic implements LinkType {
    /**
     * Determine whether a Classic link can be generated with the given input
     * @param input - linkSpecificData that comes from the request body
     */
    validate(input: any): { result: ResultStatus; error?: String } {
        // Check that title is there
        if (!input.title) {
            return {
                result: ResultStatus.Failure,
                error: "Link Type 'Classic' requires parameter 'title'"
            };
        }

        // Check that title is less than 144 characters
        if (input.title.length > 144) {
            return {
                result: ResultStatus.Failure,
                error: "A title must not be longer than 144 characters"
            };
        }

        return {
            result: ResultStatus.Success
        };
    }

    generateLink(input: any): String {
        return 'https://syamiyer.com';
    }
}

export {
    Classic
}