import { defineComponent } from "vue";
import "@renderer/style/window.scss";

export default defineComponent<{ title?: string }>(
    (props) => {
        return () => (
            <div class="control-bar">
                <div class="title-bar">{props.title}</div>
            </div>
        );
    },
    { props: ["title"] }
);
