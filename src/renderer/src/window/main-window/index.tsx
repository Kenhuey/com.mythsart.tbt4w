import { defineComponent, VNode, KeepAlive, onMounted, Ref, ref } from "vue";
import { WindowNameConstance } from "../../../../main/constant/window";
import { Base } from "@renderer/core/base";
import { Router } from "@renderer/core/router";
import { RouteRecordRaw, useRouter, Router as VueRouter } from "vue-router";
import { Icon } from "@vicons/utils";
import { AppsListDetail20Regular, AppsListDetail20Filled, Settings20Regular, Settings20Filled, Person20Regular, Person20Filled } from "@vicons/fluent";
import { RouterView } from "vue-router";
import ControlBar from "@renderer/component/window-control-bar";
import WindowFrame from "@renderer/component/window-frame";
import style from "./index.module.scss";

/**
 * Main window
 */
@Router.Window
export default class MainWindow extends Base.Application.WindowRouteRecord {
    private readonly viewName = {
        overview: "overview",
        setting: "setting",
        userList: "user-list"
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
                    path: `/${this.viewName.userList}`,
                    name: this.viewName.userList,
                    component: () => import(`./view/user-list`)
                }
            ]
        };
    }

    private readonly currentRouterName: Ref<string> = ref("");

    private router?: VueRouter;

    public getComponent() {
        return defineComponent({
            setup: () => {
                // watch router
                const router = useRouter();
                this.router = router;
                router.afterEach((to) => {
                    this.currentRouterName.value = to.name!.toString();
                    this.logger.debug(`Router pushed: "${this.currentRouterName.value}".`);
                });
                // mounted
                onMounted(() => {
                    router.push({ name: this.viewName.overview });
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
                                                <AppsListDetail20Filled />
                                            </Icon>
                                        ) : (
                                            <Icon>
                                                <AppsListDetail20Regular />
                                            </Icon>
                                        )}
                                    </div>
                                </div>
                                <div class={style["users-container"]}>
                                    <div
                                        class={[style["option"], ...(this.currentRouterName.value === this.viewName.userList ? [style["option-active"]] : [])]}
                                        onClick={() => this.router?.push({ name: this.viewName.userList })}
                                    >
                                        {this.currentRouterName.value === this.viewName.userList ? (
                                            <Icon>
                                                <Person20Filled />
                                            </Icon>
                                        ) : (
                                            <Icon>
                                                <Person20Regular />
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
                                <ControlBar showBackgroundColor={true} />
                                <RouterView
                                    class={style["option-content-container"]}
                                    v-slots={{
                                        default: ({ Component }: { Component: VNode }) => <KeepAlive>{Component}</KeepAlive>
                                    }}
                                />
                            </div>
                        </div>
                    </WindowFrame>
                );
            }
        });
    }
}
