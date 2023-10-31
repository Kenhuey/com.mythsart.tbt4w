// import icon from "../../resources/icon.png?asset";
import { app, ipcMain } from "electron";
import { LoggerFactory } from "./logger";
import { Event } from "../event";
import { Base } from "../base";

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

    function registerIpcMainEvents(): void {
        const logger = LoggerFactory.Logger.getLoggerRaw("ipc_event_register");
        const events: Array<Base.Application.BaseEventInstance> = Event.getAllRegisteredEventsClone();
        for (const event of events) {
            logger.debug(`Event registed, prefix = "${event.eventNamePrefix}"`);
            // TODO: handle
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
                // application active
                app.on("activate", () => {
                    // TODO: 初始化、创建窗体（做事件注册的反射以及静态类自动注入，事件做成装饰器获取，窗体也做成预设实体类）、窗口池 MAP
                });
            })
            .catch((error: unknown) => {
                console.error(error);
                applicationForceQuit();
            });
    }
}
