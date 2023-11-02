import { defineComponent, SlotsType } from "vue";
import ControlBar from "@renderer/window/component/control-bar";
import style from "./window-frame.module.scss";

export default defineComponent<
    { title?: string },
    {},
    "window-main",
    SlotsType<{
        default?: void;
    }>
>(
    (props, { slots }) => {
        return () => (
            <div class={style["window-frame"]}>
                <ControlBar title={props.title} />
                <div class={style["content"]}>{slots.default && slots.default()}</div>
            </div>
        );
    },
    {
        props: ["title"]
    }
);
