import { Base } from "../base";

/*
 * Utilities of events
 */
export namespace Util {
    export class Register {
        /*
         * Non-instance-able
         */
        private constructor() {
            return;
        }

        /*
         * All registered IpcMain events
         */
        private static readonly registeredIpcMainEvents: Array<Base.Application.BaseEventInstance> = [] as const;

        /*
         * Register event class decorator
         */
        public static Event<T extends { new (): Base.Application.BaseEventInstance }>(constructor: T): void {
            Register.registeredIpcMainEvents.push(new constructor());
        }

        /*
         * All registered IpcMain events clone getter
         */
        public static getAllRegisteredEventsClone(): Array<Base.Application.BaseEventInstance> {
            return [...Register.registeredIpcMainEvents];
        }
    }
}
