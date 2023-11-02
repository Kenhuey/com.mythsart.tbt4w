import { LoggerFactory } from "./application/logger";
import { BrowserWindowConstructorOptions, IpcMainEvent, IpcMainInvokeEvent } from "electron";
import { Window } from "./window";
import { IpcEventConstant } from "../constant/ipc-event";

/**
 * Base core
 */
export namespace Base {
    /**
     * Application base
     */
    export namespace Application {
        /**
         * An default object of application base
         */
        export abstract class BaseObject {
            /**
             * Default logger
             */
            private readonly _logger: LoggerFactory.LoggerType;

            /**
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

        /**
         * An default window preset object
         */
        export abstract class BaseWindowPreset extends BaseObject {
            /**
             * Window name getter
             */
            public abstract get windowName(): string;

            /**
             * Window construct options getter
             */
            public abstract get constructOptions(): BrowserWindowConstructorOptions;

            /**
             * Window build options getter
             */
            public abstract get buildOptions(): Window.BuildOptions;
        }

        /**
         * An default ipc event instance
         */
        export abstract class BaseEventIpcInstance extends BaseObject {
            /**
             * Default constructor
             */
            public constructor() {
                super("ipc_event_main");
            }

            /**
             * Current event define
             */
            public abstract get eventDefine(): IpcEventConstant.BaseEventDefine;

            /**
             * Current event prefix channel
             */
            public abstract get eventChannelPrefix(): string;

            /**
             * Receive event
             */
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            public receive(event: IpcMainEvent | IpcMainInvokeEvent, params?: any): () => void | Promise<void> {
                return () => {
                    try {
                        (event as IpcMainEvent).returnValue = null;
                    } catch (_) {
                        _;
                    }
                };
            }
        }
    }
}
