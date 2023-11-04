import { defineComponent, SlotsType } from "vue";
import { Base } from "@renderer/core/base";
import { Store } from "@renderer/core/store";
import ControlBar from "@renderer/component/window-control-bar";
import style from "./index.module.scss";

class WindowFrame extends Base.Application.Component {
    public constructor() {
        super("window_frame");
    }

    public getComponent(): any {
        return defineComponent<
            { title?: string },
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
                    <div class={[style["window-frame"], windowStatus.value.isMaximized ? null : style["border"], windowStatus.value.isFocusd ? null : style["window-frame-blur"]]}>
                        <ControlBar title={props.title} />
                        <div class={style["content"]}>{slots.default && slots.default()}</div>
                    </div>
                );
            },
            {
                props: ["title"]
            }
        );
    }
}

export default new WindowFrame().getComponent();
