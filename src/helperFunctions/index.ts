const { v4 } = require('uuid');

/**
 * Get a random ID
 */
const getRandomId = function (): String {
    return v4();
}

export {
    getRandomId
}