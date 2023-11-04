import { defineComponent } from "vue";
import { Base } from "@renderer/core/base";
import { Store } from "@renderer/core/store";
import { Icon } from "@vicons/utils";
import { Maximize16Regular, Dismiss16Regular, SquareMultiple16Regular } from "@vicons/fluent";
import { IpcEventConstant } from "../../../../main/constant/ipc-event";
import { Hook } from "@renderer/core/hook";
import DefaultIcon from "@renderer/asset/icon.png";
import style from "./index.module.scss";

class WindowControlBar extends Base.Application.Component {
    public constructor() {
        super("window_control_bar");
    }

    private windowAction(type: IpcEventConstant.Default.WindowActionCommonType, allow: boolean): void {
        if (allow) {
            new IpcEventConstant.Default.WindowAction({ toMain: type }, Hook.ipcRenderer).rendererSendToMainSync();
        }
    }

    public getComponent(): any {
        return defineComponent<{ title?: string }>(
            (props) => {
                // window status
                const { windowStatus } = Store.useCommon();
                // render
                return () => (
                    <div class={[style["control-bar"], windowStatus.value.is.focus ? null : style["control-bar-blur"]]}>
                        <div class={style["icon"]} style={{ backgroundImage: `url(${DefaultIcon})` }}></div>
                        <div class={style["title-bar"]}>{props.title}</div>
                        <div class={style["control-button-container"]}>
                            <div
                                class={[style["default-control-button"], windowStatus.value.allow.minimize ? null : style["control-button-disable"]]}
                                style={{ display: windowStatus.value.invisibleNonAllowedAction && !windowStatus.value.allow.minimize ? "none" : "flex" }}
                                onClick={() => this.windowAction("minimize", windowStatus.value.allow.minimize)}
                            >
                                <div class={style["minimize-icon"]}></div>
                            </div>
                            <div
                                class={[style["default-control-button"], windowStatus.value.allow.maximize ? null : style["control-button-disable"]]}
                                style={{ display: windowStatus.value.invisibleNonAllowedAction && !windowStatus.value.allow.maximize ? "none" : "flex" }}
                                onClick={() =>
                                    windowStatus.value.is.maximize
                                        ? this.windowAction("unmaximize", windowStatus.value.allow.maximize)
                                        : this.windowAction("maximize", windowStatus.value.allow.maximize)
                                }
                            >
                                {windowStatus.value.is.maximize ? (
                                    <Icon>
                                        <SquareMultiple16Regular />
                                    </Icon>
                                ) : (
                                    <Icon>
                                        <Maximize16Regular />
                                    </Icon>
                                )}
                            </div>
                            <div
                                class={[
                                    style["default-control-button"],
                                    windowStatus.value.allow.close ? style["control-button-close"] : null,
                                    windowStatus.value.allow.close ? null : style["control-button-disable"]
                                ]}
                                style={{ display: windowStatus.value.invisibleNonAllowedAction && !windowStatus.value.allow.close ? "none" : "flex" }}
                                onClick={() => this.windowAction("close", windowStatus.value.allow.close)}
                            >
                                <Icon>
                                    <Dismiss16Regular />
                                </Icon>
                            </div>
                        </div>
                    </div>
                );
            },
            { props: ["title"] }
        );
    }
}

export default new WindowControlBar().getComponent();
