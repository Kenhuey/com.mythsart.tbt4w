/**
 * Hooks
 */
export namespace Hook {
    /**
     * Ipc renderer(broswer)
     */
    export const ipcRenderer = window.electron.ipcRenderer;

    /**
     * Vue reactive wrapper(forge ref)
     */
    export type ReactiveWrapper<T> = { value: T };
}
