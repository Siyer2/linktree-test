import { getRandomId } from "../helperFunctions";
import { LinkTypes, ResultStatus } from "../utilities/enums";
import { Link } from "../utilities/interfaces";
import { Classic } from "./Classic";

enum ShowStatus {
    SoldOut,
    NotOnSale,
    OnSale,
}

class ShowsList extends Classic {
    /**
     * Determine whether a ShowsList link can be generated with the given input
     * @param input - linkSpecificData that comes from the request body
     */
    validate(input: any): { result: ResultStatus; error?: string } {
        // Check that the show status is there
        let classicValidation = super.validate(input);
        if (classicValidation.result == ResultStatus.Failure) {
            return classicValidation;
        }

        // Check that the show is one of the available options
        if (![ShowStatus.SoldOut, ShowStatus.NotOnSale, ShowStatus.OnSale].includes(input.showStatus)) {
            return {
                result: ResultStatus.Failure,
                error: "'showStatus' in 'linkSpecificData' must have values of 0, 1 or 2"
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
            linkType: LinkTypes.ShowsList,
            title: input.title,
            // linkSpecificData: {
            //     showStatus: input.showStatus
            // }
        };
        console.log('Creating link', newLink);
        // TODO: Upload newLink to a storage

        return `${this.baseURL}?linkId=${linkId}`;
    }
}

export {
    ShowsList,
    ShowStatus
}