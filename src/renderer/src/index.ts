import { createApp, ComponentPublicInstance } from "vue";
import { Application } from "@renderer/core/application";
import Window from "@renderer/window";
import { Base } from "@renderer/core/base";
import { Router } from "./core/router";
import "@renderer/window/main-window";

// TODO: TSX 全局管理 等等高级一点的技术，不要滥用 setup 和模板了，太 low 了
// TODO: 异步组件、TS 版依赖注入？
// TODO: 前端的 ipc 没准也可以用装饰器封装，这样在事件截获好像更方便了，做成 IPC services

/*
 * Renderer entry instance
 */
@Application.Renderer
export default class Renderer extends Base.Application.BaseObject implements Application.Entry {
    /*
     * Vue app instance
     */
    private readonly _renderer: ComponentPublicInstance;

    /*
     * Vue app getter
     */
    public get renderer(): ComponentPublicInstance {
        return this._renderer;
    }

    /*
     * Pre-initialize
     */
    constructor() {
        super("renderer_entrance");
        // create vue application
        this._renderer = createApp(Window).use(Router.getWindowRouter()).mount("#application");
    }

    onMounted(): void {
        // done
        this.logger.info(`Renderer mounted.`);
    }
}
