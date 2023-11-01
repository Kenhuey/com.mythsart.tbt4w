import { WindowNameConstance } from "../../../main/constant/window"; // todo alias
import { Base } from "@renderer/core/base";
import { Router } from "@renderer/core/router";
import { DefineComponent, defineComponent } from "vue";
import { RouteRecordRaw } from "vue-router";
import WindowFrame from "@renderer/window/component/window-frame";

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

    public getComponent(): DefineComponent<{}, {}, any> {
        return defineComponent({
            setup: () => {
                return () => <WindowFrame />;
            }
        });
    }
}
