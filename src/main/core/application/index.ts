// import icon from "../../resources/icon.png?asset";
import { app, ipcMain } from "electron";
import { LoggerFactory } from "./logger";
import { Event } from "../event";
import { Base } from "../base";
import { Window } from "../window";

export { LoggerFactory };

/*
 * Entries of application
 */
export namespace Application {
    /*
     * Base interface of application entry
     */
    export interface Entry {
        /*
         * Run after application mounted
         */
        onMounted(): void;
    }

    /*
     * Force quit
     */
    function applicationForceQuit(): void {
        app.quit();
        process.exit(-1);
    }

    /*
     * Register all IpcMain events
     */
    function registerIpcMainEvents(): void {
        const logger = LoggerFactory.Logger.getLoggerRaw("ipc_event_register");
        const events: Array<Base.Application.BaseEventInstance> = Event.getAllRegisteredEventsClone();
        // register
        for (const event of events) {
            // receive
            ipcMain.handle(event.eventNamePrefix, (_event, params) => {
                event.receive(_event, params);
            });
            // done register one event
            logger.info(`Event registed, prefix = "${event.eventNamePrefix}"`);
        }
    }

    /*
     * Application entry
     */
    export function Main<T extends { new (): Entry }>(constructor: T): void {
        // check instance is singleton
        if (!app.requestSingleInstanceLock()) {
            applicationForceQuit();
        }
        // create main instance
        const mainInstance: Entry = new constructor();
        // application initialize
        app.whenReady()
            .then(() => {
                // application initialized
                mainInstance.onMounted();
                // register IpcMain events
                registerIpcMainEvents();
                // TODO: persistence
                // TODO: configure
                // application active
                {
                    // TODO: 走程序初始化完毕业务流程
                    Window.Generator.build(Window.Preset.MainWindowPreset);
                }
            })
            .catch((error: unknown) => {
                console.error(error);
                applicationForceQuit();
            });
    }
}
