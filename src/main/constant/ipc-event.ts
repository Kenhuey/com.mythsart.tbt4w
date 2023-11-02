import { IpcRendererEvent } from "electron";
import { IpcRenderer } from "@electron-toolkit/preload";

/**
 * IPC event constants
 * Renderer refence safe
 */
export namespace IpcEventConstant {
    /**
     * Base event class
     */
    export abstract class BaseEventDefine {
        /**
         * Channel name
         */
        public abstract get channel(): string;

        /**
         * Default params
         */
        public abstract get defaultParamsRendererToMain(): any;

        /**
         * Default params
         */
        public abstract get defaultParamsMainToRenderer(): any;

        /**
         * Default renderer receive
         */
        public abstract handleRendererReceive(ipcRenderer: IpcRenderer, callback: (event: IpcRendererEvent, params: any) => void): void;

        public abstract rendererSendToMainSync(ipcRenderer: IpcRenderer, params: any): void;

        public abstract rendererSendToMain(ipcRenderer: IpcRenderer, params: any): void;
    }

    /**
     * Window default events
     */
    export namespace Default {
        /**
         * No type(for default)
         */
        type NoType = undefined;

        /**
         * Window action type(both renderer and main)
         */
        type WindowActionCommonType = NoType | "minimize" | "maximize" | "unmaximize" | "restore" | "blur" | "focus" | "close" | "hide" | "show";

        /**
         * When window action
         */
        export class WindowAction<
            Options extends {
                toMain?: WindowActionCommonType;
                toRenderer?: WindowActionCommonType;
            }
        > extends BaseEventDefine {
            private options: Options;

            public constructor(options: Options) {
                super();
                this.options = options;
            }

            public get channel(): string {
                return "WINDOW_ACTION";
            }

            public get defaultParamsRendererToMain(): WindowActionCommonType {
                return this.options.toMain;
            }

            public get defaultParamsMainToRenderer(): WindowActionCommonType {
                return this.options.toRenderer;
            }

            public handleRendererReceive(ipcRenderer: IpcRenderer, callback: (event: IpcRendererEvent, params: WindowActionCommonType) => void): void {
                ipcRenderer.on(this.channel, callback);
            }

            public rendererSendToMainSync(ipcRenderer: IpcRenderer, params: WindowActionCommonType): void {
                ipcRenderer.sendSync(this.channel, params);
            }

            public rendererSendToMain(ipcRenderer: IpcRenderer, params: WindowActionCommonType): void {
                ipcRenderer.send(this.channel, params);
            }
        }
    }

    export namespace Custom {}
}
