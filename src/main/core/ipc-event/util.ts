import { Base } from "../base";

/**
 * Utilities of events
 */
export namespace Util {
    export class Register {
        /**
         * Non-instance-able
         */
        private constructor() {
            return;
        }

        /**
         * All registered IpcMain events
         */
        private static readonly registeredIpcMainEvents: Array<Base.Application.BaseEventIpcInstance> = [];

        /**
         * Register event class decorator
         */
        public static IpcEvent<T extends { new (): Base.Application.BaseEventIpcInstance }>(constructor: T): void {
            Register.registeredIpcMainEvents.push(new constructor());
        }

        /**
         * All registered IpcMain events clone getter
         */
        public static getAllRegisteredEventsClone(): Array<Base.Application.BaseEventIpcInstance> {
            return [...Register.registeredIpcMainEvents];
        }
    }
}
