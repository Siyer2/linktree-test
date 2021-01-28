import { getRandomId } from "../helperFunctions";
import { LinkTypes, ResultStatus } from "../utilities/enums";
import { Link } from "../utilities/interfaces";
import { Classic } from "./Classic";

enum ShowStatus {
    SoldOut,
    NotOnSale,
    OnSale,
}

interface Show {
    showStatus: ShowStatus,
    venue: String
}

interface ShowLink extends Link {
    shows: Show[]
}

class ShowsList extends Classic {
    /**
     * Determine whether a ShowsList link can be generated with the given input
     * @param input - linkSpecificData that comes from the request body
     */
    validate(input: any): { result: ResultStatus; error?: string } {
        let classicValidation = super.validate(input);
        if (classicValidation.result == ResultStatus.Failure) {
            return classicValidation;
        }

        // Check that there is a shows parameter
        if (!input.shows || !Array.isArray(input.shows) || input.shows.length === 0) {
            return {
                result: ResultStatus.Failure,
                error: "A non-empty 'shows' array is a required parameter when creating a Shows link"
            };
        }

        // Loop through each show and ensure that it is valid
        let error = '';
        input.shows.forEach((show: any) => {
            if (![ShowStatus.NotOnSale, ShowStatus.OnSale, ShowStatus.SoldOut].includes(show.showStatus)
                || (!show.venue)) {
                error = show;
            };
        });
        if (error) {
            return {
                result: ResultStatus.Failure,
                error: `Invalid show: ${JSON.stringify(error)}`
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
        let newLink: ShowLink = {
            linkId: linkId,
            userId: userId,
            dateCreated: new Date(),
            linkType: LinkTypes.ShowsList,
            title: input.title,
            shows: input.shows
        }

        console.log('Creating link', newLink);
        // TODO: Upload newLink to a storage

        return `${this.baseURL}?linkId=${linkId}`;
    }
}

export {
    ShowsList,
    ShowStatus
}