/*
 * Logger
 */
export namespace LoggerFactory {
    /*
     * Factory class
     */
    export class Logger {
        private readonly _loggerName: string;

        public get loggerName(): string {
            return this._loggerName;
        }
        /*
         * Constructor
         */
        private constructor(loggerName: string) {
            this._loggerName = loggerName;
        }

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
        public static getLoggerRaw(loggerName?: string): Logger {
            if (!loggerName) {
                return Logger.consoleLogger;
            }
            return Logger.getLogger(loggerName).Logger;
        }
        // TODO: 重新实现一个 logger， log4js 在浏览器（特别是 vite 里面）用不了半点 又研究了一早上 草泥马的

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
            // Log4js.configure({
            //     appenders: {
            //         raw: {
            //             type: "console",
            //             layout: {
            //                 type: "pattern",
            //                 pattern: "%d{yyyy-MM-dd hh:mm:ss} [%p] %c - %m"
            //             }
            //         }
            //     },
            //     categories: {
            //         default: {
            //             appenders: ["raw"],
            //             level: "ALL"
            //             // enableCallStack: true
            //         }
            //     }
            // });
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
