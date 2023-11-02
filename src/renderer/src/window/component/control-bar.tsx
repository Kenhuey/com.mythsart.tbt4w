import { defineComponent } from "vue";
import style from "./control-bar.module.scss";

export default defineComponent<{ title?: string }>(
    (props) => {
        return () => (
            <div class={style["control-bar"]}>
                <div class={style["title-bar"]}>{props.title}</div>
            </div>
        );
    },
    { props: ["title"] }
);
