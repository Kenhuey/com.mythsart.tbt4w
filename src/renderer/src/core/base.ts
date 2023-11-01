import { LoggerFactory } from "@renderer/core/application/logger";
import { RouteRecordRaw } from "vue-router";
import { DefineComponent } from "vue";

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
            private readonly _logger: LoggerFactory.Logger;

            /*
             * Default logger getter
             */
            protected get logger(): LoggerFactory.Logger {
                return this._logger;
            }

            constructor(loggerName?: string) {
                // logger initialize
                LoggerFactory.Logger.initialize();
                // set logger
                this._logger = LoggerFactory.Logger.getLogger(loggerName);
            }
        }

        /*
         * Base component interface
         */
        export interface Component {
            getComponent: () => DefineComponent<{}, {}, any>;
        }

        /*
         * Base window record object
         */
        export abstract class WindowRouteRecord extends Base.Application.BaseObject implements Component {
            /*
             * Constructor
             */
            public constructor() {
                super("router_record");
            }

            /*
             * Vue router raw record
             */
            public abstract get raw(): RouteRecordRaw;

            public abstract getComponent(): DefineComponent<{}, {}, any>;
        }
    }
}
