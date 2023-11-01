import { createApp, ComponentPublicInstance } from "vue";
import { Application } from "@renderer/core/application";
import Window from "@renderer/window";
import { Base } from "@renderer/core/base";

// TODO: TSX 全局管理 等等高级一点的技术，不要滥用 setup 和模板了，太 low 了

// TODO: 异步组件、TS 版依赖注入？

/*
 * Renderer entry instance
 */
@Application.Renderer
export class Renderer extends Base.Application.BaseObject implements Application.Entry {
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
        this._renderer = createApp(Window).mount("#application");
    }

    onMounted(): void {
        // done
        this.logger.info(`Renderer mounted.`);
    }
}
