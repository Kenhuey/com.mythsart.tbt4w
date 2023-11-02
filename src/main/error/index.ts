/**
 * Global errors
 */
export namespace ApplicationError {
    export abstract class BaseError extends Error {
        constructor(message: string) {
            super(message);
        }
    }
}
