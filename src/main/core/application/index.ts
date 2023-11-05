// import icon from "../../resources/icon.png?asset";
import { app, ipcMain } from "electron";
import { LoggerFactory } from "./logger";
import { IpcEvent } from "../ipc-event";
import { Base } from "../base";
import { Window } from "../window";
import { is } from "@electron-toolkit/utils";

export { LoggerFactory };

/**
 * Entries of application
 */
export namespace Application {
    /**
     * Application logger
     */
    const logger: LoggerFactory.LoggerType = LoggerFactory.Logger.getLoggerRaw("application");

    /**
     * Base interface of application entry
     */
    export interface Entry {
        /**
         * Run after application mounted
         */
        onMounted(): void;
    }

    /**
     * Force quit
     */
    function applicationForceQuit(): void {
        app.quit();
        process.exit(-1);
    }

    /**
     * Register all IpcMain events
     */
    function registerIpcMainEvents(): void {
        const loggerMessagePrefix: string = "(IpcMain)";
        const events: Array<Base.Application.BaseEventIpcInstance> = IpcEvent.getAllRegisteredEventsClone();
        // register
        for (const event of events) {
            // receive
            ipcMain.on(event.eventChannelPrefix, (_event, params) => {
                logger.info(`${loggerMessagePrefix} received, channel = "${event.eventChannelPrefix}", params = ${JSON.stringify(params)}.`);
                _event.returnValue = null;
                event.receive(_event, params)();
            });
            // done register one event
            logger.info(`${loggerMessagePrefix} receiver event registed, channel_prefix = "${event.eventChannelPrefix}".`);
        }
    }

    function logApplicationInformation(): void {
        logger.info(`Debug = "${is.dev}".`);
    }

    /**
     * Application entry
     */
    export function Main<T extends { new (): Entry }>(constructor: T): void {
        // check instance is singleton
        if (!app.requestSingleInstanceLock()) {
            logger.info("Application is already running.");
            applicationForceQuit();
        }
        // create main instance
        const mainInstance: Entry = new constructor();
        // application initialize
        app.whenReady()
            .then(() => {
                logApplicationInformation();
                // register IpcMain events
                registerIpcMainEvents();
                // application active
                {
                    // TODO: persistence
                    // TODO: configure
                    // TODO: 走程序初始化完毕业务流程
                    const mainWindowInstance = Window.Generator.build(Window.Preset.MainWindowPreset);
                    // multiple application
                    app.on("second-instance", () => {
                        mainWindowInstance.rawBroswerWindow.focus();
                        // TODO: 单例启动提示 notif..
                    });
                }
                // application initialized
                mainInstance.onMounted();
            })
            .catch((error: unknown) => {
                console.error(error);
                applicationForceQuit();
            });
    }
}
