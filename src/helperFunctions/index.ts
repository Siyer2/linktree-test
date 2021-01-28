const { v4 } = require('uuid');

/**
 * Get a random ID
 */
const getRandomId = function (): String {
    //TODO: Verify that the random ID is not already in use
    return v4();
}

export {
    getRandomId
}