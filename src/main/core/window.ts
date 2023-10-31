import { shell, BrowserWindow, BrowserWindowConstructorOptions, IpcMainEvent, WebContents, IpcMainInvokeEvent } from "electron";
import { is, optimizer } from "@electron-toolkit/utils";
import { Base } from "./base";
import Path from "path";
import { DefaultEvent, Event } from "./event";
import { EventConstant } from "../constant/event";

/*
 * Window core
 */
export namespace Window {
    /*
     * Window build options
     */
    export interface BuildOptions {
        windowName: string;
        showWhenReady?: boolean;
    }

    /*
     * Inner utils
     */
    export namespace Util {
        /*
         * IpcMainEvent.WebContents declare
         * Unsafe, not documented
         */
        export interface Sender extends WebContents {
            getOwnerBrowserWindow(): BrowserWindow | null;
        }

        /*
         * Get browser window by event
         */
        export function getOwnerBrowserWindowByIpcMainEvent(event: IpcMainEvent | IpcMainInvokeEvent): BrowserWindow {
            return (event.sender as Sender).getOwnerBrowserWindow()!;
        }
    }

    /*
     * Generator instance
     */
    export class Instance extends Base.Application.BaseObject {
        /*
         * Construct options
         */
        private readonly browserWindowConstructorOptions: BrowserWindowConstructorOptions;

        /*
         * Raw broswer window instance
         */
        private readonly _rawBroswerWindow: BrowserWindow;

        /*
         * Broswer window url path
         */
        private readonly _windowPath: string;

        /*
         * Get raw broswer window instance
         */
        public get rawBroswerWindow(): BrowserWindow {
            return this._rawBroswerWindow;
        }

        /*
         * Constructor
         */
        public constructor(
            /*
             * Options when construct
             */
            constructOptions: BrowserWindowConstructorOptions,
            /*
             * Options when build
             */
            buildOptions: BuildOptions
        ) {
            // construct initialize
            super("window_instance");
            this.browserWindowConstructorOptions = constructOptions;
            // build constructor options
            {
                // avoid blank view flashing
                this.browserWindowConstructorOptions.show = false;
                // force options
                if (!this.browserWindowConstructorOptions.webPreferences) {
                    this.browserWindowConstructorOptions.webPreferences = {};
                }
                if (!this.browserWindowConstructorOptions.webPreferences?.nodeIntegration) {
                    this.browserWindowConstructorOptions.webPreferences.nodeIntegration = true;
                }
                if (!this.browserWindowConstructorOptions.webPreferences?.contextIsolation) {
                    this.browserWindowConstructorOptions.webPreferences.contextIsolation = true;
                }
                if (!this.browserWindowConstructorOptions.transparent) {
                    this.browserWindowConstructorOptions.transparent = true;
                }
                // avoid cors origins
                if (!this.browserWindowConstructorOptions.webPreferences.webSecurity) {
                    this.browserWindowConstructorOptions.webPreferences.webSecurity = false;
                }
            }
            // build window
            {
                // create window
                const browserWindow: BrowserWindow = new BrowserWindow(this.browserWindowConstructorOptions);
                // show window
                browserWindow.once("ready-to-show", () => {
                    if (buildOptions.showWhenReady) {
                        browserWindow.show();
                        browserWindow.focus();
                    }
                });
                // disable default menu
                browserWindow.setMenu(null);
                // external url open rules
                browserWindow.webContents.setWindowOpenHandler(({ url }) => {
                    if (url.startsWith("https:") || url.startsWith("http:")) {
                        shell.openExternal(url);
                    }
                    return { action: "deny" };
                });
                // set window url
                if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
                    this._windowPath = process.env["ELECTRON_RENDERER_URL"] + `#${buildOptions.windowName}`;
                    browserWindow.loadURL(this._windowPath);
                } else {
                    this._windowPath = Path.join(__dirname, "../renderer/index.html") + `#${buildOptions.windowName}`;
                    browserWindow.loadFile(this._windowPath);
                }
                this._rawBroswerWindow = browserWindow;
                // dev tools short cut
                optimizer.watchWindowShortcuts(this._rawBroswerWindow);
            }
            {
                this._rawBroswerWindow.on("close", () => {
                    const ipcEvent = Event.getEvent(DefaultEvent.Close);
                    const params: typeof EventConstant.Default.Close.params.paramsMainToRenderer = {};
                    this._rawBroswerWindow.webContents.send(ipcEvent.eventNamePrefix, params);
                });
            }
            // done
            this.logger.debug(`Window builded: id = "${this.rawBroswerWindow.id}", name = "${buildOptions.windowName}", path = "${this._windowPath}".`);
        }
    }

    /*
     * Window presets
     */
    export namespace Preset {
        /*
         * Main window
         */
        export class MainWindowPreset extends Base.Application.BaseWindowPreset {
            public get windowName(): string {
                return "main-window";
            }

            public get constructOptions(): Electron.BrowserWindowConstructorOptions {
                return {
                    width: 1024,
                    height: 704,
                    frame: true
                };
            }

            public get buildOptions(): BuildOptions {
                return {
                    windowName: this.windowName,
                    showWhenReady: true
                };
            }
        }
    }

    /*
     * Window generator
     */
    export namespace Generator {
        /*
         * Window instance pool map type
         * <id, instance>
         */
        type WindowPoolType = Map<number, Instance>;

        /*
         * Window instance pool map
         */
        const windowPoolMap: WindowPoolType = new Map();

        /*
         * Get window pool map's clone
         * To avoid to change pool map(value instance still can be operate)
         */
        export function getWindowPoolMapClone(): WindowPoolType {
            return new Map([...windowPoolMap]);
        }

        /*
         * Build window
         */
        export function build<T extends { new (): Base.Application.BaseWindowPreset }>(presetType: T): Instance {
            const windowPreset: Base.Application.BaseWindowPreset = new presetType();
            const windowInstance: Instance = new Instance(windowPreset.constructOptions, windowPreset.buildOptions);
            return windowInstance;
        }
    }
}
