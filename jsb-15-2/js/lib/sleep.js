/**
 * function sleep(ms)
 */

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}