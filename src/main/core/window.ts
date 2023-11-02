import { shell, BrowserWindow, BrowserWindowConstructorOptions, IpcMainEvent, WebContents, IpcMainInvokeEvent, nativeImage } from "electron";
import { is, optimizer } from "@electron-toolkit/utils";
import { Base } from "./base";
import Path from "path";
import { EventConstant } from "../constant/event";
import { WindowNameConstance } from "../constant/window";
import LogoIcon from "../../../resources/icon.png?asset";

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
         * Build options
         */
        private readonly browserWindowbuildOptions: BuildOptions;

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
            this.browserWindowbuildOptions = buildOptions;
            // build constructor options
            {
                // avoid blank view flashing
                this.browserWindowConstructorOptions.show = false;
                // force options
                if (!this.browserWindowConstructorOptions.webPreferences) {
                    this.browserWindowConstructorOptions.webPreferences = {};
                }
                if (!this.browserWindowConstructorOptions.webPreferences?.contextIsolation) {
                    this.browserWindowConstructorOptions.webPreferences.contextIsolation = true;
                }
                if (!this.browserWindowConstructorOptions.icon) {
                    this.browserWindowConstructorOptions.icon = nativeImage.createFromDataURL(LogoIcon);
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
                    browserWindow.loadURL(this._windowPath);
                }
                this._rawBroswerWindow = browserWindow;
                // dev tools short cut
                optimizer.watchWindowShortcuts(this.rawBroswerWindow);
            }
            // default window action events
            {
                const ipcEvent = EventConstant.getEventDefine(EventConstant.Default.WindowAction);
                const defaultParams = ipcEvent.defaultParamsMainToRenderer;
                this.rawBroswerWindow.on("minimize", () => {
                    const params = "minimize" as typeof defaultParams;
                    this.rawBroswerWindow.webContents.send(ipcEvent.channel, params);
                    this.logActionDebug("Window minimize.");
                });
                this.rawBroswerWindow.on("maximize", () => {
                    const params = "maximize" as typeof defaultParams;
                    this.rawBroswerWindow.webContents.send(ipcEvent.channel, params);
                    this.logActionDebug("Window maximize.");
                });
                this.rawBroswerWindow.on("unmaximize", () => {
                    const params = "unmaximize" as typeof defaultParams;
                    this.rawBroswerWindow.webContents.send(ipcEvent.channel, params);
                    this.logActionDebug("Window unmaximize.");
                });
                this.rawBroswerWindow.on("restore", () => {
                    const params = "restore" as typeof defaultParams;
                    this.rawBroswerWindow.webContents.send(ipcEvent.channel, params);
                    this.logActionDebug("Window restore.");
                });
                this.rawBroswerWindow.on("blur", () => {
                    const params = "blur" as typeof defaultParams;
                    this.rawBroswerWindow.webContents.send(ipcEvent.channel, params);
                    this.logActionDebug("Window blur.");
                });
                this.rawBroswerWindow.on("close", () => {
                    // TODO: delete from window pool
                    const params = "close" as typeof defaultParams;
                    this.rawBroswerWindow.webContents.send(ipcEvent.channel, params);
                    this.logActionDebug("Window close.");
                });
                this.rawBroswerWindow.on("hide", () => {
                    const params = "hide" as typeof defaultParams;
                    this.rawBroswerWindow.webContents.send(ipcEvent.channel, params);
                    this.logActionDebug("Window hide.");
                });
                this.rawBroswerWindow.on("focus", () => {
                    const params = "focus" as typeof defaultParams;
                    this.rawBroswerWindow.webContents.send(ipcEvent.channel, params);
                    this.logActionDebug("Window focus.");
                });
                this.rawBroswerWindow.on("show", () => {
                    const params = "show" as typeof defaultParams;
                    this.rawBroswerWindow.webContents.send(ipcEvent.channel, params);
                    this.logActionDebug("Window show.");
                });
            }
            // done
            this.logger.debug(`Window builded: id = "${this.rawBroswerWindow.id}", name = "${buildOptions.windowName}", path = "${this._windowPath}".`);
        }

        private logActionDebug(message: string): void {
            this.logger.debug(`(id = "${this.rawBroswerWindow.id}", name = "${this.browserWindowbuildOptions.windowName}") Action: ${message}`);
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
                return WindowNameConstance.MainWindow;
            }

            public get constructOptions(): Electron.BrowserWindowConstructorOptions {
                const size = {
                    minWidth: 1024,
                    minHeight: 704
                };
                return {
                    minWidth: size.minWidth,
                    minHeight: size.minHeight,
                    width: size.minWidth,
                    height: size.minHeight,
                    frame: false,
                    webPreferences: {
                        nodeIntegration: true
                    }
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
