import { WindowNameConstance } from "../../../../main/constant/window";
import { Base } from "@renderer/core/base";
import { Router } from "@renderer/core/router";
import { defineComponent } from "vue";
import { RouteRecordRaw } from "vue-router";
import WindowFrame from "@renderer/component/window-frame";
import style from "./index.module.scss";

/*
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
                        <div class={style["main-window"]}>Main Window Content</div>
                    </WindowFrame>
                );
            }
        });
    }
}
