import { getRandomId } from "../helperFunctions";
import { LinkTypes, ResultStatus } from "../utilities/enums";
import { LinkType, Link } from "../utilities/interfaces";

class Classic implements LinkType {
    baseURL = 'https://fakelinktree.com/';

    /**
     * Determine whether a Classic link can be generated with the given input
     * @param input - linkSpecificData that comes from the request body
     */
    validate(input: any): { result: ResultStatus; error?: string } {
        // Check that title is there
        if (!input.title) {
            return {
                result: ResultStatus.Failure,
                error: "'title' is a required parameter"
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
            linkType: LinkTypes.Classic,
            title: input.title
        };
        console.log('Creating link', newLink);
        // TODO: Upload newLink to a storage

        return `${this.baseURL}?linkId=${linkId}`;
    }
}

export {
    Classic
}