import { defineComponent } from "vue";
import "@renderer/style/window.scss";

export default defineComponent({
    setup: (_, { slots }) => {
        return () => <div class="control-bar"> Control Bar</div>;
    }
});
