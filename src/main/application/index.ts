// import icon from "../../resources/icon.png?asset";
import { app, BrowserWindow } from "electron";
import { LoggerFactory } from "./logger";

export { LoggerFactory };

/*
 * Entries of application
 */
export namespace Application {
    /*
     * Base class of application entry
     */
    export abstract class Entry {
        /*
         * Pre-initialize
         */
        public constructor() {
            return;
        }

        /*
         * Run after application mounted
         */
        public onMounted(): void {
            return;
        }
    }

    /*
     * Force quit
     */
    function applicationForceQuit(): void {
        app.quit();
        process.exit(-1);
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
                // TODO: test
                const window = new BrowserWindow({
                    width: 1024,
                    height: 704,
                    maximizable: false,
                    resizable: false,
                    frame: true
                });
                window.loadURL(process.env["ELECTRON_RENDERER_URL"]!);
                window.webContents.openDevTools({ mode: "detach" });
                window.show();
            })
            .catch((error: unknown) => {
                console.error(error);
                applicationForceQuit();
            });
    }
}
