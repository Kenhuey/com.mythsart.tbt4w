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
        private _ipcRenderer?: IpcRenderer;

        protected get ipcRenderer(): IpcRenderer | undefined {
            return this._ipcRenderer;
        }

        public constructor(ipcRenderer?: IpcRenderer) {
            this._ipcRenderer = ipcRenderer;
        }

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
        public abstract handleRendererReceive(callback: (event: IpcRendererEvent, params: any) => void): void;

        /**
         * Renderer to main sync
         */
        public rendererSendToMainSync(): void {
            this.ipcRenderer?.sendSync(this.channel, this.defaultParamsRendererToMain);
        }

        /**
         * Renderer to main
         */
        public rendererSendToMain(): void {
            this.ipcRenderer?.send(this.channel, this.defaultParamsRendererToMain);
        }
    }

    /**
     * Window default events
     */
    export namespace Default {
        /**
         * No type(for default)
         */
        export type NoType = undefined;

        /**
         * Window action type(both renderer and main)
         */
        export type WindowActionCommonType = NoType | "minimize" | "maximize" | "unmaximize" | "restore" | "blur" | "focus" | "close" | "hide" | "show";

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

            public constructor(options: Options, ipcRenderer?: IpcRenderer) {
                super(ipcRenderer);
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

            public handleRendererReceive(callback: (event: IpcRendererEvent, params: WindowActionCommonType) => void): void {
                super.ipcRenderer?.on(this.channel, callback);
            }
        }

        /**
         * Window status type
         */
        export type WindowStatusType = {
            is: {
                minimize: boolean;
                maximize: boolean;
                focus: boolean;
            };
            allow: {
                minimize: boolean;
                maximize: boolean;
                close: boolean;
            };
            invisibleNonAllowedAction: boolean;
        };

        /**
         * Window status
         */
        export class WindowStatus<
            Options extends {
                toRenderer?: WindowStatusType;
            }
        > extends BaseEventDefine {
            private options: Options;

            public constructor(options: Options, ipcRenderer?: IpcRenderer) {
                super(ipcRenderer);
                this.options = options;
            }

            public get channel(): string {
                return "WINDOW_STATUS";
            }

            public get defaultParamsRendererToMain(): NoType {
                return undefined;
            }

            public get defaultParamsMainToRenderer(): WindowStatusType | undefined {
                return this.options.toRenderer;
            }

            public handleRendererReceive(callback: (event: IpcRendererEvent, params: WindowStatusType) => void): void {
                super.ipcRenderer?.on(this.channel, callback);
            }
        }
    }

    export namespace Custom {}
}
