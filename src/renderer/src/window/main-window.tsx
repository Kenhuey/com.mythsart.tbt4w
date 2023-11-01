import { WindowNameConstance } from "../../../main/constant/window";
import { Base } from "@renderer/core/base";
import { Router } from "@renderer/core/router";
import { DefineComponent, defineComponent } from "vue";
import { RouteRecordRaw } from "vue-router";

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
                return () => <div>Main Window</div>;
            }
        });
    }
}
