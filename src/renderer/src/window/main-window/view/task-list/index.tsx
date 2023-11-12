import { Ref, defineComponent, ref, onMounted } from "vue";
import { Base } from "@renderer/core/base";
import { Icon } from "@vicons/utils";
import { ChevronRight20Filled } from "@vicons/fluent";
import style from "./index.module.scss";

class Overview extends Base.Application.Component {
    public constructor() {
        super("setting_over_view");
    }

    private readonly containerRef: Ref<HTMLElement | null> = ref(null);

    private readonly containerWidth: Ref<number> = ref(0);

    private readonly drawerUserId: Ref<string | null> = ref(null);

    public getComponent(): any {
        return defineComponent(() => {
            // on mounted
            onMounted(() => {
                const onResize = () => {
                    this.containerWidth.value = this.containerRef.value!.offsetWidth - 16 * 2 + 2;
                };
                window.addEventListener("resize", () => {
                    onResize();
                });
                onResize();
            });
            // render
            return () => (
                <>
                    {/* drawer */}
                    {/* drawer */}
                    <div class={style["drawer"]} style={{ width: `${this.containerWidth.value}px`, right: `${this.drawerUserId.value === null ? "-100%" : "0px"}` }}>
                        <div class={style["content"]}>
                            <div class={style["title-container"]}>
                                <div style={{ flex: 1 }}>
                                    <div class="default-title-text">
                                        <span>Username</span>
                                    </div>
                                    <div class="default-sub-title-text">{"Nickname"}</div>
                                </div>
                                <div
                                    class={style["inner"]}
                                    onClick={() => {
                                        this.drawerUserId.value = null;
                                    }}
                                >
                                    <span class={style["back-text"]}>Back To List</span>
                                    <Icon class={style["back-icon"]}>
                                        <ChevronRight20Filled />
                                    </Icon>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* view */}
                    <div ref={this.containerRef} class={style["container"]}>
                        <div class={style["title-container"]}>
                            <div style={{ flex: 1 }}>
                                <div class="default-title-text">Task List</div>
                                <div class="default-sub-title-text">9 Records</div>
                            </div>
                            <div class="default-flex-column-container" style={{ justifyContent: "center", height: "100%" }}>
                                <div class={style["title-button-container"]}>
                                    <span>Append User</span>
                                </div>
                            </div>
                        </div>
                        <div class={[style["list-container"], "default-scroll"]}>
                            <div
                                class={style["user-container"]}
                                onClick={() => {
                                    this.drawerUserId.value = "TODO:";
                                }}
                                title="Click To Edit Task"
                            >
                                <div class={style["border-left"]}></div>
                                <div class={style["avatar"]}></div>
                                <div class={style["content"]}>
                                    <div class={style["username"]}>
                                        <div class={style["original-name"]}>
                                            <span>Username</span>
                                            <span class={style["nick-name"]} style={{ marginLeft: "6px" }}>
                                                ({"Nickname"})
                                            </span>
                                        </div>
                                        <div class={style["status"]}>
                                            <div class={style["status-dot-error"]}></div>
                                            <span style={{ marginLeft: "6px" }}>Offline</span>
                                        </div>
                                    </div>
                                    <div class={style["task-detail"]}>
                                        <div class={style["date"]}>
                                            <span>Last Update:&nbsp;</span>
                                            <span>{new Date().toString()}</span>
                                        </div>
                                    </div>
                                    <div class={style["to-icon-container"]}>
                                        <Icon>
                                            <ChevronRight20Filled />
                                        </Icon>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            );
        });
    }
}

export default new Overview().getComponent();
