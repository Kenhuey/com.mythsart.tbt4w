import { WindowNameConstance } from "../../../../main/constant/window";
import { Base } from "@renderer/core/base";
import { Router } from "@renderer/core/router";
import { defineComponent } from "vue";
import { RouteRecordRaw } from "vue-router";
import { IpcEventConstant } from "../../../../main/constant/ipc-event";
import { Hook } from "@renderer/core/hook";
import WindowFrame from "@renderer/component/window-frame";
import style from "./index.module.scss";

function close(): void {
    new IpcEventConstant.Default.WindowAction({}).rendererSendToMain(Hook.ipcRenderer, "close");
}

/**
 * Main window
 */
@Router.Window
export default class MainWindow extends Base.Application.WindowRouteRecord {
    public get raw(): RouteRecordRaw {
        return {
            path: `/${WindowNameConstance.MainWindow}`,
            name: WindowNameConstance.MainWindow,
            component: this.getComponent(),
            children: []
        };
    }

    public getComponent() {
        return defineComponent({
            setup: () => {
                return () => (
                    <WindowFrame title="Main Window Title">
                        <div class={style["main-window"]}>
                            Main Window Content <button onClick={close}>close</button>
                            TODO: 写上他妈的 service，做成单例（装饰器注入有bug用不了半点）
                        </div>
                    </WindowFrame>
                );
            }
        });
    }
}
