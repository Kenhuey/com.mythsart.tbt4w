import { createApp, ComponentPublicInstance } from "vue";
import { Application } from "@renderer/core/application";
import { Base } from "@renderer/core/base";
import { Router } from "@renderer/core/router";
import { Store } from "./core/store";
import { IpcEventConstant } from "../../main/constant/ipc-event";
import { Hook } from "./core/hook";
import { createPinia } from "pinia";
import Window from "@renderer/window";

/**
 * Renderer entry instance
 */
@Application.Renderer
export default class Renderer extends Base.Application.BaseObject implements Application.Entry {
    /**
     * Vue app instance
     */
    private readonly _renderer: ComponentPublicInstance;

    /**
     * Vue app getter
     */
    public get renderer(): ComponentPublicInstance {
        return this._renderer;
    }

    /**
     * Pre-initialize
     */
    constructor() {
        super("renderer_entrance");
        // create vue application
        this._renderer = createApp(Window).use(createPinia()).use(Router.getWindowRouter()).mount("#application");
    }

    onMounted(): void {
        // update window status
        const { windowStatus } = Store.useCommon();
        // window status event
        new IpcEventConstant.Default.WindowStatus({}, Hook.ipcRenderer).handleRendererReceive((_event, params) => {
            this.logger.debug(`Window status updated: "${JSON.stringify(windowStatus.value, null, 0)}".`);
            windowStatus.value = params;
        });
        // default window action event
        new IpcEventConstant.Default.WindowAction({}, Hook.ipcRenderer).handleRendererReceive((_event, params) => {
            // refresh window status
            new IpcEventConstant.Default.WindowStatus({}, Hook.ipcRenderer).rendererSendToMainSync();
            // log action type
            this.logger.debug(`Window action updated: "${params}".`);
            new IpcEventConstant.Default.WindowStatus({}, Hook.ipcRenderer).rendererSendToMainSync();
        });
        // mounted
        this.logger.info(`Renderer mounted.`);
    }
}
