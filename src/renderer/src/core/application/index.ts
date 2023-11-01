/*
 * Entries of renderer application
 */
export namespace Application {
    /*
     * Base interface of renderer application entry
     */
    export interface Entry {
        /*
         * Run after renderer application mounted
         */
        onMounted(): void;
    }

    /*
     * Renderer application entry
     */
    export function Renderer<T extends { new (): Entry }>(constructor: T): void {
        const rendererInstance: Entry = new constructor();
        rendererInstance.onMounted();
    }
}
