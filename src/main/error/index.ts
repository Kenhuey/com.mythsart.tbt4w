/*
 * Global errors
 */
export namespace Errors {
    export abstract class BaseError extends Error {
        constructor(message: string) {
            super(message);
        }
    }
}
