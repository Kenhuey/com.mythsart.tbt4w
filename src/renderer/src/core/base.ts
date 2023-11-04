import { LoggerFactory } from "@renderer/core/application/logger";
import { RouteRecordRaw } from "vue-router";
import { DefineComponent } from "vue";

/**
 * Base core
 */
export namespace Base {
    /**
     * Vue defineComponent default type
     */
    export type DefineComponentType = DefineComponent<{}, {}, any>;

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
            private readonly _logger: LoggerFactory.Logger;

            /**
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

        /**
         * Base component interface
         */
        export interface IComponent {
            /**
             * Vue component getter
             */
            getComponent: () => DefineComponentType;
        }

        /**
         * Base component class
         */
        export abstract class Component extends Base.Application.BaseObject implements IComponent {
            public abstract getComponent(): DefineComponentType;

            /**
             * Constructor
             */
            protected constructor(loggerName: string) {
                super(`component(${loggerName})`);
            }
        }

        /**
         * Base window record object
         */
        export abstract class WindowRouteRecord extends Base.Application.BaseObject implements IComponent {
            public abstract getComponent(): DefineComponentType;

            /**
             * Constructor
             */
            public constructor() {
                super("window_router_record");
            }

            /**
             * Vue router raw record
             */
            public abstract get raw(): RouteRecordRaw;
        }
    }
}
