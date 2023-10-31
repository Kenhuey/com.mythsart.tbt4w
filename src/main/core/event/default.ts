import { EventConstant } from "../../constant/event";
import { Base } from "../base";
import { BrowserWindow, IpcMainEvent } from "electron";
import { Window } from "../window";
import { Util } from "./util";

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
            return EventConstant.Default.Show.name;
        }

        public get receive(): (event: IpcMainEvent) => void | Promise<void> {
            return (event) => {
                const senderWindow: BrowserWindow = Window.Util.getOwnerBrowserWindowByIpcMainEvent(event);
                senderWindow.close();
            };
        }
    }
}
