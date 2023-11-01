import { defineComponent } from "vue";
import ControlBar from "@renderer/window/component/control-bar";
import "@renderer/style/window.scss";

export default defineComponent({
    setup: (_, { slots }) => {
        return () => (
            <div class="frame">
                <ControlBar />
                <div class="content">{slots.content && slots.content()} asd</div>
            </div>
        );
    }
});
