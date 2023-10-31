import { LoggerFactory } from "./application/logger";
import { BrowserWindowConstructorOptions, IpcMainEvent, IpcRendererEvent } from "electron";
import { Window } from "./window";

/*
 * Base core
 */
export namespace Base {
    /*
     * Application base
     */
    export namespace Application {
        /*
         * An default object of application base
         */
        export abstract class BaseObject {
            /*
             * Default logger
             */
            private readonly _logger: LoggerFactory.LoggerType;

            /*
             * Default logger getter
             */
            protected get logger(): LoggerFactory.LoggerType {
                return this._logger;
            }

            constructor(loggerName?: string) {
                // logger initialize
                LoggerFactory.Logger.initialize();
                // set logger
                this._logger = LoggerFactory.Logger.getLoggerRaw(loggerName);
            }
        }

        /*
         * An default window preset object
         */
        export abstract class BaseWindowPreset extends BaseObject {
            /*
             * Window name getter
             */
            public abstract get windowName(): string;

            /*
             * Window construct options getter
             */
            public abstract get constructOptions(): BrowserWindowConstructorOptions;

            /*
             * Window build options getter
             */
            public abstract get buildOptions(): Window.BuildOptions;
        }

        /*
         * An default window event instance
         */
        export abstract class BaseEventInstance extends BaseObject {
            /*
             * Default constructor
             */
            public constructor() {
                super("ipc_event");
            }

            /*
             * Current event prefix name
             */
            public abstract get eventNamePrefix(): string;

            /*
             * Send event
             */
            public get send(): (params?: any) => void | Promise<void> {
                return () => {};
            }

            /*
             * Receive event
             */
            public get receive(): (event: IpcMainEvent, params?: any) => void | Promise<void> {
                return () => {};
            }
            /*
             * Reply event
             */
            public get replay(): (event: IpcRendererEvent, params?: any) => void | Promise<void> {
                return () => {};
            }
        }
    }
}
