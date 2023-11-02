import { defineComponent } from "vue";
import DefaultIcon from "@renderer/asset/icon.png";
import style from "./index.module.scss";

export default defineComponent<{ title?: string }>(
    (props) => {
        console.log(DefaultIcon);
        return () => (
            <div class={style["control-bar"]}>
                <div class={style["icon"]} style={{ backgroundImage: `url(${DefaultIcon})` }}></div>
                <div class={style["title-bar"]}>{props.title}</div>
            </div>
        );
    },
    { props: ["title"] }
);
