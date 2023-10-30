import "reflect-metadata";
import { Errors } from "../error";
import { MetadataType } from "../constant/metadata";
import Log4js from "log4js";


/*
 * Logger
 */
export namespace LoggerFactory {
    /*
     * Logger alias
     */
    export type LoggerType = Log4js.Logger;

    /*
     * Logger default error
     */
    export class LoggerError extends Errors.BaseError {
        constructor(message: string = "An unknown error of logger.") {
            super(message);
        }
    }

    /*
     * Field injector
     */
    export function inject(loggerName: string, raw: boolean = false): PropertyDecorator {
        return (target, propertyKey) => {
            const _type = Reflect.getMetadata(MetadataType.DESIGN_TYPE, target, propertyKey);
            console.debug(`type = ${_type}`);
            const _od = Reflect.getOwnPropertyDescriptor(target, propertyKey);
            console.debug(`od = ${_od}`);
            // instantiate descriptor
            const value = raw ? Logger.getLoggerRaw(loggerName) : Logger.getLogger(loggerName);
            const propertyDescriptor: PropertyDescriptor = Reflect.getOwnPropertyDescriptor(target, propertyKey) || {
                writable: true,
                configurable: true
            };
            propertyDescriptor.value = value;
            target[propertyKey] = value;
            // inject
            Reflect.defineProperty(target, propertyKey, propertyDescriptor);
            return propertyDescriptor;
        };
    }

    /*
     * Factory class
     */
    export class Logger {
        /*
         * Default logger
         */
        private static consoleLogger: LoggerType | undefined;

        /*
         * Loggers
         */
        private static loggerMap: Map<string, Logger> = new Map([]);

        /*
         * Current logger
         */
        private readonly _logger: LoggerType;

        public static getLogger(loggerName: string): Logger {
            // check logger is initialized
            Logger.logger;
            // get logger
            if (!Logger.loggerMap.get(loggerName)) {
                // create logger
                Logger.loggerMap.set(loggerName, new Logger(loggerName));
            }
            // done
            return Logger.loggerMap.get(loggerName)!;
        }

        public static getLoggerRaw(loggerName: string): LoggerType {
            return Logger.getLogger(loggerName).loggerRaw;
        }

        /*
         * Constructor
         */
        private constructor(loggerName: string) {
            this._logger = Log4js.getLogger(loggerName);
        }

        /*
         * Logget getter
         */
        public get loggerRaw(): LoggerType {
            return this._logger;
        }

        /*
         * Get console(default) logger
         */
        public static get logger(): LoggerType {
            if (Logger.consoleLogger === undefined) {
                Logger.initialize();
            }
            return Logger.consoleLogger!;
        }

        /*
         * Logger initialize
         */
        public static initialize(): typeof LoggerFactory {
            // configure
            Log4js.configure({
                appenders: {
                    raw: {
                        type: "console",
                        layout: {
                            type: "pattern",
                            pattern: "[%d{yyyy-MM-dd hh:mm:ss}] [%p] <%h_%z> %c - %m"
                        }
                    }
                },
                categories: {
                    default: {
                        appenders: ["raw"],
                        level: "ALL",
                        enableCallStack: true
                    }
                }
            });
            // replace default console output levels
            Logger.consoleLogger = Log4js.getLogger("console");
            console.log = Logger.consoleLogger.info.bind(Logger.consoleLogger);
            console.info = Logger.consoleLogger.info.bind(Logger.consoleLogger);
            console.warn = Logger.consoleLogger.warn.bind(Logger.consoleLogger);
            console.error = Logger.consoleLogger.error.bind(Logger.consoleLogger);
            console.trace = Logger.consoleLogger.trace.bind(Logger.consoleLogger);
            console.debug = Logger.consoleLogger.debug.bind(Logger.consoleLogger);
            // done
            console.debug("Logger initialized.");
            return LoggerFactory;
        }
    }
}
