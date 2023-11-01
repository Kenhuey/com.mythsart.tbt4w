import { defineComponent } from "vue";
import "../../style/window.scss";

export default defineComponent({
    setup: (_, { slots }) => {
        return () => <div class="frame">{slots.content && slots.content()}</div>;
    }
});
