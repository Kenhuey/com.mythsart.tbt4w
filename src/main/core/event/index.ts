import { Base } from "../base";
import { Default } from "./default";
import { Custom } from "./custom";
import { Util } from "./util";

export { Default as DefaultEvent };
export { Custom as CustomEvent };
export { Util as EventUtil };

/*
 * Events of IpcMain
 */
export namespace Event {
    /*
     * Get event by class
     */
    export function getEvent<T extends { new (): Base.Application.BaseEventInstance }>(eventType: T): Base.Application.BaseEventInstance {
        return new eventType();
    }

    /*
     * All registered IpcMain events clone getter
     */
    export function getAllRegisteredEventsClone(): Array<Base.Application.BaseEventInstance> {
        return Util.Register.getAllRegisteredEventsClone();
    }
}
