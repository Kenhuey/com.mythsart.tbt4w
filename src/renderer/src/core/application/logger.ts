/*
 * Logger
 */
export namespace LoggerFactory {
    /*
     * Factory class
     */
    export class Logger {
        /*
         * Logger name
         */
        private readonly _loggerName: string;

        /*
         * Logger name getter
         */
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

        private static _consoleLogger: Logger | undefined = undefined;

        /*
         * Get console(default) logger
         */
        public static get consoleLogger(): Logger {
            if (Logger._consoleLogger === undefined) {
                Logger.initialize();
            }
            return Logger._consoleLogger!;
        }

        /*
         * Get logger instance by name
         */
        public static getLogger(loggerName?: string): Logger {
            // check logger is initialized
            Logger.consoleLogger;
            if (!loggerName) {
                return Logger.consoleLogger;
            }
            // get logger
            if (!Logger.loggerMap.get(loggerName)) {
                // create logger
                Logger.loggerMap.set(loggerName, new Logger(loggerName));
            }
            // done
            return Logger.loggerMap.get(loggerName)!;
        }

        /*
         * Logger
         */
        private static _logger: Logger | undefined = undefined;

        /*
         * Logger getter
         */
        private static get logger(): Logger {
            return Logger._logger!;
        }

        private static readonly consoleLoggerName: string = "console" as const;

        private static bindConsoleLogger(callback: Function, level: "INFO" | "WARN" | "ERROR" | "TRACE" | "DEBUG"): (message: any) => void {
            return (message: any, name: string = Logger.consoleLoggerName) => {
                const date: Date = new Date();
                callback.call(console, `[${date.toLocaleDateString()} ${date.toLocaleTimeString()}] [${level}] ${name} - ${message}`);
            };
        }

        public info(message: string): void {
            console.info(message, this.loggerName);
        }

        public warn(message: string): void {
            console.warn(message, this.loggerName);
        }

        public error(message: string): void {
            console.error(message, this.loggerName);
        }

        public trace(message: string): void {
            console.trace(message, this.loggerName);
        }

        public debug(message: string): void {
            console.debug(message, this.loggerName);
        }

        /*
         * Logger initialize
         */
        public static initialize(): typeof LoggerFactory {
            if (LoggerFactory.Logger._consoleLogger) {
                return LoggerFactory;
            }
            Logger._consoleLogger = new Logger(Logger.consoleLoggerName);
            console.log = Logger.bindConsoleLogger(console.log, "INFO");
            console.info = Logger.bindConsoleLogger(console.info, "INFO");
            console.warn = Logger.bindConsoleLogger(console.warn, "WARN");
            console.error = Logger.bindConsoleLogger(console.error, "ERROR");
            console.trace = Logger.bindConsoleLogger(console.trace, "TRACE");
            console.debug = Logger.bindConsoleLogger(console.debug, "DEBUG");
            // done
            this._logger = LoggerFactory.Logger.getLogger("logger");
            this.logger && this.logger.debug("Logger initialized.");
            return LoggerFactory;
        }
    }
}
