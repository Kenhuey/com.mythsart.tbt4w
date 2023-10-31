import { EventConstant } from "../../constant/event";
import { Base } from "../base";
import { BrowserWindow, IpcMainEvent, IpcMainInvokeEvent } from "electron";
import { Window } from "../window";
import { Util } from "./util";


// TODO: 重写 Action 集成 show focus close 等消息 废除原先的 close（同时能测试关于通用类型是否能用）

/*
 * Default(system) window event
 */
export namespace Default {
    /*
     * On close
     */
    @Util.Register.Event
    export class Close extends Base.Application.BaseEventInstance {
        public get eventNamePrefix(): string {
            return EventConstant.Default.Close.name;
        }

        public receive(event: IpcMainEvent | IpcMainInvokeEvent, params: typeof EventConstant.Default.Close.params.paramsRendererToMain): () => void | Promise<void> {
            params;
            return () => {
                const senderWindow: BrowserWindow = Window.Util.getOwnerBrowserWindowByIpcMainEvent(event);
                senderWindow.close();
            };
        }
    }
}
