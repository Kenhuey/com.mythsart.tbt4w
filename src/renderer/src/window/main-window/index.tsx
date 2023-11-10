import { defineComponent, VNode, KeepAlive, onMounted, Ref, ref } from "vue";
import { WindowNameConstance } from "../../../../main/constant/window";
import { Base } from "@renderer/core/base";
import { Router } from "@renderer/core/router";
import { RouteRecordRaw, useRouter, Router as VueRouter } from "vue-router";
import { Icon } from "@vicons/utils";
import { AppsListDetail20Regular, AppsListDetail20Filled, Settings20Regular, Settings20Filled, DataPie20Regular, DataPie20Filled } from "@vicons/fluent";
import { RouterView } from "vue-router";
import ControlBar from "@renderer/component/window-control-bar";
import WindowFrame from "@renderer/component/window-frame";
import style from "./index.module.scss";
import { Store } from "@renderer/core/store";

/**
 * Main window
 */
@Router.Window
export default class MainWindow extends Base.Application.WindowRouteRecord {
    private readonly viewName = {
        overview: "overview",
        setting: "setting",
        taskList: "task-list"
    } as const;

    public get raw(): RouteRecordRaw {
        return {
            path: `/${WindowNameConstance.MainWindow}`,
            name: WindowNameConstance.MainWindow,
            component: this.getComponent(),
            children: [
                {
                    path: ``,
                    name: this.viewName.overview,
                    component: () => import("./view/overview")
                },
                {
                    path: `/${this.viewName.setting}`,
                    name: this.viewName.setting,
                    component: () => import("./view/setting")
                },
                {
                    path: `/${this.viewName.taskList}`,
                    name: this.viewName.taskList,
                    component: () => import(`./view/task-list`)
                }
            ]
        };
    }

    private readonly currentRouterName: Ref<string> = ref("");

    private readonly routerViewMaxHeight: Ref<number> = ref(0);

    private readonly controlBarRef: Ref<HTMLElement | null> = ref(null);

    private readonly routerViewRef: Ref<HTMLElement | null> = ref(null);

    private router?: VueRouter;

    public getComponent() {
        return defineComponent({
            setup: () => {
                // window status
                const { windowStatus } = Store.useCommon();
                // watch router
                const router = useRouter();
                this.router = router;
                router.afterEach((to) => {
                    this.currentRouterName.value = to.name!.toString();
                    this.logger.debug(`Router pushed: "${this.currentRouterName.value}".`);
                });
                // mounted
                onMounted(() => {
                    // push to overview
                    router.push({ name: this.viewName.overview });
                    // scroll bar
                    const onResize = () => {
                        // max-height
                        this.routerViewMaxHeight.value =
                            window.innerHeight -
                            this.controlBarRef.value!.clientHeight -
                            parseInt(this.routerViewRef.value!.computedStyleMap().get("padding-top")!.toString().replace("px", "")) -
                            parseInt(this.routerViewRef.value!.computedStyleMap().get("padding-bottom")!.toString().replace("px", "")) -
                            (windowStatus.value.is.maximize ? 0 : 2);
                        // max-width
                        // this.routerViewMaxWidth.value = this.routerViewRef.value!.clientWidth;
                        // console.log(this.routerViewMaxWidth.value);
                    };
                    window.addEventListener("resize", () => {
                        onResize();
                    });
                    onResize();
                });
                // render
                return () => (
                    <WindowFrame>
                        <div class={style["main-window-frame"]}>
                            <div class={style["option-list-container"]}>
                                <div class={style["dock-top-container"]}>
                                    <div
                                        class={[style["option"], ...(this.currentRouterName.value === this.viewName.overview ? [style["option-active"]] : [])]}
                                        onClick={() => this.router?.push({ name: this.viewName.overview })}
                                    >
                                        {this.currentRouterName.value === this.viewName.overview ? (
                                            <Icon>
                                                <DataPie20Filled />
                                            </Icon>
                                        ) : (
                                            <Icon>
                                                <DataPie20Regular />
                                            </Icon>
                                        )}
                                    </div>
                                </div>
                                <div class={style["tasks-container"]}>
                                    <div
                                        class={[style["option"], ...(this.currentRouterName.value === this.viewName.taskList ? [style["option-active"]] : [])]}
                                        onClick={() => this.router?.push({ name: this.viewName.taskList })}
                                    >
                                        {this.currentRouterName.value === this.viewName.taskList ? (
                                            <Icon>
                                                <AppsListDetail20Filled />
                                            </Icon>
                                        ) : (
                                            <Icon>
                                                <AppsListDetail20Regular />
                                            </Icon>
                                        )}
                                    </div>
                                </div>
                                <div class={style["dock-bottom-container"]}>
                                    <div
                                        class={[style["option"], ...(this.currentRouterName.value === this.viewName.setting ? [style["option-active"]] : [])]}
                                        onClick={() => this.router?.push({ name: this.viewName.setting })}
                                    >
                                        {this.currentRouterName.value === this.viewName.setting ? (
                                            <Icon>
                                                <Settings20Filled />
                                            </Icon>
                                        ) : (
                                            <Icon>
                                                <Settings20Regular />
                                            </Icon>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div class={style["main-window-sub-frame"]}>
                                <div ref={this.controlBarRef}>
                                    <ControlBar />
                                </div>
                                <div ref={this.routerViewRef} class={style["option-content-container"]} style={{ maxHeight: this.routerViewMaxHeight.value + "px" }}>
                                    <RouterView
                                        class={style["router-view"]}
                                        v-slots={{
                                            default: ({ Component }: { Component: VNode }) => <KeepAlive>{Component}</KeepAlive>
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </WindowFrame>
                );
            }
        });
    }
}
