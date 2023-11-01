import { LoggerFactory } from "@renderer/core/application/logger";

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
    }
}
