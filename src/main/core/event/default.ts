import { EventConstant } from "../../constant/event";
import { Base } from "../base";
import { BrowserWindow, IpcMainEvent, IpcMainInvokeEvent } from "electron";
import { Window } from "../window";
import { Util } from "./util";
import { LoggerFactory } from "../application";

// TODO: 重写 Action 集成 show focus close 等消息 废除原先的 close（同时能测试关于通用类型是否能用）

/*
 * Default(system) window event
 */
export namespace Default {
    /*
     * On default action
     */
    @Util.Register.Event
    export class WindowAction extends Base.Application.BaseEventInstance {
        public get eventDefine(): EventConstant.BaseEventDefine {
            return EventConstant.getEventDefine(EventConstant.Default.WindowAction);
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
}
