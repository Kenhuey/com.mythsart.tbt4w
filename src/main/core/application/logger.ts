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
     * Field injector
     */
    // export function inject(loggerName: string, raw: boolean = false): PropertyDecorator {
    //     return (target, propertyKey) => {
    //         // instantiate descriptor
    //         const value = raw ? Logger.getLoggerRaw(loggerName) : Logger.getLogger(loggerName);
    //         const propertyDescriptor: PropertyDescriptor = Reflect.getOwnPropertyDescriptor(target, propertyKey) || {
    //             writable: true,
    //             configurable: true
    //         };
    //         propertyDescriptor.value = value; // TODO: reflect not work, bug of electron-vite
    //         // target[propertyKey] = value;
    //         // inject
    //         Reflect.defineProperty(target, propertyKey, propertyDescriptor);
    //         return propertyDescriptor;
    //     };
    // }

    /*
     * Factory class
     */
    export class Logger {
        /*
         * Current logger
         */
        private readonly _logger: LoggerType;

        /*
         * Constructor
         */
        private constructor(loggerName: string) {
            this._logger = Log4js.getLogger(loggerName);
        }

        /*
         * Logger getter
         */
        public get loggerRaw(): LoggerType {
            return this._logger;
        }
        /*
         * Logger
         */
        private static _logger: LoggerType | undefined;

        /*
         * Logger getter
         */
        private static get logger(): LoggerType | undefined {
            return Logger._logger;
        }

        /*
         * Default logger
         */
        private static _consoleLogger: LoggerType | undefined;

        /*
         * Loggers
         */
        private static loggerMap: Map<string, Logger> = new Map([]);

        /*
         * Get logger instance by name
         */
        public static getLogger(loggerName: string): Logger {
            // check logger is initialized
            Logger.consoleLogger;
            // get logger
            if (!Logger.loggerMap.get(loggerName)) {
                // create logger
                Logger.loggerMap.set(loggerName, new Logger(loggerName));
            }
            // done
            return Logger.loggerMap.get(loggerName)!;
        }

        /*
         * Get logger raw by name
         */
        public static getLoggerRaw(loggerName?: string): LoggerType {
            if (!loggerName) {
                return Logger.consoleLogger;
            }
            return Logger.getLogger(loggerName).loggerRaw;
        }

        /*
         * Get console(default) logger
         */
        public static get consoleLogger(): LoggerType {
            if (Logger._consoleLogger === undefined) {
                Logger.initialize();
            }
            return Logger._consoleLogger!;
        }

        /*
         * Logger initialize
         */
        public static initialize(): typeof LoggerFactory {
            if (LoggerFactory.Logger._consoleLogger) {
                return LoggerFactory;
            }
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
            Logger._consoleLogger = Log4js.getLogger("console");
            console.log = Logger.consoleLogger.info.bind(Logger.consoleLogger);
            console.info = Logger.consoleLogger.info.bind(Logger.consoleLogger);
            console.warn = Logger.consoleLogger.warn.bind(Logger.consoleLogger);
            console.error = Logger.consoleLogger.error.bind(Logger.consoleLogger);
            console.trace = Logger.consoleLogger.trace.bind(Logger.consoleLogger);
            console.debug = Logger.consoleLogger.debug.bind(Logger.consoleLogger);
            // done
            this._logger = LoggerFactory.Logger.getLoggerRaw("logger");
            this.logger && this.logger.debug("Logger initialized.");
            return LoggerFactory;
        }
    }
}
