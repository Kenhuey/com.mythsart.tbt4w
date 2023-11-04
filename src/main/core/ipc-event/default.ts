import { IpcEventConstant } from "../../constant/ipc-event";
import { Base } from "../base";
import { BrowserWindow, IpcMainEvent, IpcMainInvokeEvent } from "electron";
import { Window } from "../window";
import { Util } from "./util";

/**
 * Default(system) window event
 */
export namespace Default {
    /**
     * Window action
     */
    @Util.Register.IpcEvent
    export class WindowAction extends Base.Application.BaseEventIpcInstance {
        public get eventDefine() {
            return new IpcEventConstant.Default.WindowAction({});
        }

        public get eventChannelPrefix(): string {
            return this.eventDefine.channel;
        }

        public receive(event: IpcMainEvent | IpcMainInvokeEvent, params: any): () => void | Promise<void> {
            const convertedParams = params as typeof this.eventDefine.defaultParamsRendererToMain;
            const senderWindow: BrowserWindow = Window.Util.getOwnerBrowserWindowByIpcMainEvent(event);
            return () => {
                switch (convertedParams) {
                    case "minimize": {
                        senderWindow.minimize();
                        break;
                    }
                    case "maximize": {
                        senderWindow.maximize();
                        break;
                    }
                    case "unmaximize": {
                        senderWindow.unmaximize();
                        break;
                    }
                    case "restore": {
                        senderWindow.restore();
                        break;
                    }
                    case "blur": {
                        senderWindow.blur();
                        break;
                    }
                    case "focus": {
                        senderWindow.focus();
                        break;
                    }
                    case "close": {
                        senderWindow.close();
                        break;
                    }
                    case "hide": {
                        senderWindow.hide();
                        break;
                    }
                    case "show": {
                        senderWindow.show();
                        break;
                    }
                }
            };
        }
    }

    /**
     * Window status
     */
    @Util.Register.IpcEvent
    export class WindowStatus extends Base.Application.BaseEventIpcInstance {
        public get eventDefine() {
            return new IpcEventConstant.Default.WindowStatus({});
        }

        public get eventChannelPrefix(): string {
            return this.eventDefine.channel;
        }

        public receive(event: IpcMainEvent | IpcMainInvokeEvent): () => void | Promise<void> {
            const senderWindow: BrowserWindow = Window.Util.getOwnerBrowserWindowByIpcMainEvent(event);
            return () => {
                const convertedParams: typeof this.eventDefine.defaultParamsMainToRenderer = {
                    isFocusd: senderWindow.isFocused(),
                    isMaximized: senderWindow.isMaximized()
                };
                senderWindow.webContents.send(this.eventChannelPrefix, convertedParams);
            };
        }
    }
}
