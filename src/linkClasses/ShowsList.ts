import { ResultStatus } from "../utilities/enums";
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
    validate(input: any): { result: ResultStatus; error?: String } {
        // Check that the show status is there
        let classicValidation = super.validate(input);
        if (classicValidation.result == ResultStatus.Failure) {
            return classicValidation;
        }

        // Check that the show is one of the available options
        if (![ShowStatus.SoldOut, ShowStatus.NotOnSale, ShowStatus.OnSale].includes(input.showStatus)) {
            return {
                result: ResultStatus.Failure,
                error: "A 'showStatus' must have values of 0, 1 or 2"
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
    ShowsList
}