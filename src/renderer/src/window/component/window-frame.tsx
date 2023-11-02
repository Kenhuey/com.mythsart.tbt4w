import { defineComponent, SlotsType } from "vue";
import ControlBar from "@renderer/window/component/control-bar";
import "@renderer/style/window.scss";

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
            <div class="frame">
                <ControlBar title={props.title} />
                <div class="content">{slots.default && slots.default()}</div>
            </div>
        );
    },
    {
        props: ["title"]
    }
);
