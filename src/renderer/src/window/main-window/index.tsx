import { WindowNameConstance } from "../../../../main/constant/window";
import { Base } from "@renderer/core/base";
import { Router } from "@renderer/core/router";
import { defineComponent } from "vue";
import { RouteRecordRaw } from "vue-router";
import { Icon } from "@vicons/utils";
import { AppsListDetail20Regular, AppsListDetail24Filled, Settings20Regular, Settings20Filled, AddSquare20Regular, AddSquare20Filled, Person20Regular } from "@vicons/fluent";
import ControlBar from "@renderer/component/window-control-bar";
import WindowFrame from "@renderer/component/window-frame";
import style from "./index.module.scss";

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
                    <WindowFrame>
                        <div class={style["main-window-frame"]}>
                            <div class={style["option-list-container"]}>
                                <div class={style["dock-top-container"]}>
                                    <Icon class={style["option"]}>
                                        <AppsListDetail20Regular />
                                    </Icon>
                                </div>
                                <div class={style["users-container"]}>
                                    <Icon class={style["option"]}>
                                        <Person20Regular />
                                    </Icon>
                                </div>
                                <div class={style["dock-bottom-container"]}>
                                    <Icon class={style["option"]}>
                                        <Settings20Regular />
                                    </Icon>
                                </div>
                            </div>
                            <div class={style["main-window-sub-frame"]}>
                                <ControlBar showBackgroundColor={true} />
                                <div class={style["router-view"]}>router-view</div>
                            </div>
                        </div>
                    </WindowFrame>
                );
            }
        });
    }
}
