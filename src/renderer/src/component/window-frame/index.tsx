import { defineComponent, SlotsType } from "vue";
import { Base } from "@renderer/core/base";
import { Store } from "@renderer/core/store";
import { PropsType as ControlBarPropsType } from "@renderer/component/window-control-bar";
import ControlBar from "@renderer/component/window-control-bar";
import style from "./index.module.scss";

class WindowFrame extends Base.Application.Component {
    public constructor() {
        super("window_frame");
    }

    public getComponent(): any {
        return defineComponent<
            { showControlBar?: boolean; controlBarOptions?: ControlBarPropsType },
            {},
            "",
            SlotsType<{
                default?: void;
            }>
        >(
            (props, { slots }) => {
                // window status
                const { windowStatus } = Store.useCommon();
                // render
                return () => (
                    <div class={[style["window-frame"], windowStatus.value.is.maximize ? null : style["border"], windowStatus.value.is.focus ? null : style["window-frame-blur"]]}>
                        {props.showControlBar ? <ControlBar title={props.controlBarOptions?.title} /> : null}
                        <div class={style["content"]}>{slots.default && slots.default()}</div>
                    </div>
                );
            },
            {
                props: ["showControlBar", "controlBarOptions"]
            }
        );
    }
}

export default new WindowFrame().getComponent();
