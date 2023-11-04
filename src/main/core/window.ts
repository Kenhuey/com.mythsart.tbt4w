import { shell, BrowserWindow, BrowserWindowConstructorOptions, IpcMainEvent, WebContents, IpcMainInvokeEvent, nativeImage } from "electron";
import { is, optimizer } from "@electron-toolkit/utils";
import { Base } from "./base";
import { IpcEventConstant } from "../constant/ipc-event";
import { WindowNameConstance } from "../constant/window";
import Path from "path";
import LogoIcon from "../../../resources/icon.png?asset";

/**
 * Window core
 */
export namespace Window {
    /**
     * Window build options
     */
    export interface BuildOptions {
        windowName: string;
        showWhenReady?: boolean;
    }

    /**
     * Inner utils
     */
    export namespace Util {
        /**
         * IpcMainEvent.WebContents declare
         * WARN: Unsafe, not documented
         */
        export interface Sender extends WebContents {
            getOwnerBrowserWindow(): BrowserWindow | null;
        }

        /**
         * Get browser window by event
         */
        export function getOwnerBrowserWindowByIpcMainEvent(event: IpcMainEvent | IpcMainInvokeEvent): BrowserWindow {
            return (event.sender as Sender).getOwnerBrowserWindow()!;
        }
    }

    /**
     * Generator instance
     */
    export class Instance extends Base.Application.BaseObject {
        /**
         * Construct options
         */
        private readonly browserWindowConstructorOptions: BrowserWindowConstructorOptions;

        /**
         * Build options
         */
        private readonly browserWindowbuildOptions: BuildOptions;

        /**
         * Raw broswer window instance
         */
        private readonly _rawBroswerWindow: BrowserWindow;

        /**
         * Broswer window url path
         */
        private readonly _windowPath: string;

        /**
         * Get raw broswer window instance
         */
        public get rawBroswerWindow(): BrowserWindow {
            return this._rawBroswerWindow;
        }

        /**
         * Constructor
         */
        public constructor(
            /**
             * Options when construct
             */
            constructOptions: BrowserWindowConstructorOptions,
            /**
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
                if (!this.browserWindowConstructorOptions.webPreferences?.preload) {
                    this.browserWindowConstructorOptions.webPreferences.preload = Path.join(__dirname, "../preload/index.js");
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
                const minimize = "minimize";
                this.rawBroswerWindow.on(minimize, () => {
                    const event = new IpcEventConstant.Default.WindowAction({ toRenderer: minimize });
                    const params = event.defaultParamsMainToRenderer;
                    this.rawBroswerWindow.webContents.send(event.channel, params);
                    this.logActionDebug(`Window "${minimize}".`);
                });
                const maximize = "maximize";
                this.rawBroswerWindow.on(maximize, () => {
                    const event = new IpcEventConstant.Default.WindowAction({ toRenderer: maximize });
                    const params = event.defaultParamsMainToRenderer;
                    this.rawBroswerWindow.webContents.send(event.channel, params);
                    this.logActionDebug(`Window "${maximize}".`);
                });
                const unmaximize = "unmaximize";
                this.rawBroswerWindow.on(unmaximize, () => {
                    const event = new IpcEventConstant.Default.WindowAction({ toRenderer: unmaximize });
                    const params = event.defaultParamsMainToRenderer;
                    this.rawBroswerWindow.webContents.send(event.channel, params);
                    this.logActionDebug(`Window "${unmaximize}".`);
                });
                const restore = "restore";
                this.rawBroswerWindow.on(restore, () => {
                    const event = new IpcEventConstant.Default.WindowAction({ toRenderer: restore });
                    const params = event.defaultParamsMainToRenderer;
                    this.rawBroswerWindow.webContents.send(event.channel, params);
                    this.logActionDebug(`Window "${restore}".`);
                });
                const blur = "blur";
                this.rawBroswerWindow.on(blur, () => {
                    const event = new IpcEventConstant.Default.WindowAction({ toRenderer: blur });
                    const params = event.defaultParamsMainToRenderer;
                    this.rawBroswerWindow.webContents.send(event.channel, params);
                    this.logActionDebug(`Window "${blur}".`);
                });
                const close = "close";
                this.rawBroswerWindow.on(close, () => {
                    // TODO: delete from window pool
                    const event = new IpcEventConstant.Default.WindowAction({ toRenderer: close });
                    const params = event.defaultParamsMainToRenderer;
                    this.rawBroswerWindow.webContents.send(event.channel, params);
                    this.logActionDebug(`Window "${close}".`);
                });
                const hide = "hide";
                this.rawBroswerWindow.on(hide, () => {
                    const event = new IpcEventConstant.Default.WindowAction({ toRenderer: hide });
                    const params = event.defaultParamsMainToRenderer;
                    this.rawBroswerWindow.webContents.send(event.channel, params);
                    this.logActionDebug(`Window "${hide}".`);
                });
                const focus = "focus";
                this.rawBroswerWindow.on(focus, () => {
                    const event = new IpcEventConstant.Default.WindowAction({ toRenderer: focus });
                    const params = event.defaultParamsMainToRenderer;
                    this.rawBroswerWindow.webContents.send(event.channel, params);
                    this.logActionDebug(`Window "${focus}".`);
                });
                const show = "show";
                this.rawBroswerWindow.on(show, () => {
                    const event = new IpcEventConstant.Default.WindowAction({ toRenderer: show });
                    const params = event.defaultParamsMainToRenderer;
                    this.rawBroswerWindow.webContents.send(event.channel, params);
                    this.logActionDebug(`Window "${show}".`);
                });
            }
            // done
            this.logger.debug(`Window builded: id = "${this.rawBroswerWindow.id}", name = "${buildOptions.windowName}", path = "${this._windowPath}".`);
        }

        private logActionDebug(message: string): void {
            this.logger.debug(`(id = "${this.rawBroswerWindow.id}", name = "${this.browserWindowbuildOptions.windowName}") Action: ${message}`);
        }
    }

    /**
     * Window presets
     */
    export namespace Preset {
        /**
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

    /**
     * Window generator
     */
    export namespace Generator {
        /**
         * Window instance pool map type
         * <id, instance>
         */
        type WindowPoolType = Map<number, Instance>;

        /**
         * Window instance pool map
         */
        const windowPoolMap: WindowPoolType = new Map();

        /**
         * Get window pool map's clone
         * To avoid to change pool map(value instance still can be operate)
         */
        export function getWindowPoolMapClone(): WindowPoolType {
            return new Map([...windowPoolMap]);
        }

        /**
         * Build window
         */
        export function build<T extends { new (): Base.Application.BaseWindowPreset }>(presetType: T): Instance {
            const windowPreset: Base.Application.BaseWindowPreset = new presetType();
            const windowInstance: Instance = new Instance(windowPreset.constructOptions, windowPreset.buildOptions);
            return windowInstance;
        }
    }
}
