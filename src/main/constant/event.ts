/**
 * IPC event constants
 * Renderer refence safe
 */
export namespace EventConstant {
    /**
     * Base event class
     */
    export abstract class BaseEventDefine {
        public abstract get channel(): string;

        public abstract get defaultParamsRendererToMain(): any;

        public abstract get defaultParamsMainToRenderer(): any;
    }

    export function getEventDefine<T extends { new (): BaseEventDefine }>(constructor: T) {
        return new constructor();
    }

    /**
     * Window default events
     */
    export namespace Default {
        /**
         * When window action
         */
        export class WindowAction extends BaseEventDefine {
            public get channel(): string {
                return "DEFAULT_WINDOW_ACTION";
            }

            public get defaultParamsRendererToMain() {
                type DefaultParamsType = undefined | "minimize" | "maximize" | "unmaximize" | "restore" | "blur" | "focus" | "close" | "hide" | "show";
                const defayltParams: DefaultParamsType = undefined;
                return defayltParams as DefaultParamsType;
            }

            public get defaultParamsMainToRenderer() {
                return this.defaultParamsRendererToMain;
            }
        }
    }

    export namespace Custom {}
}
