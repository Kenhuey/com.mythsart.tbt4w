import { defineComponent } from "vue";
import { Base } from "@renderer/core/base";
import DefaultIcon from "@renderer/asset/icon.png";
import style from "./index.module.scss";

class WindowControlBar extends Base.Application.Component {
    public constructor() {
        super("window_control_bar");
    }

    public getComponent(): any {
        return defineComponent<{ title?: string }>(
            (props) => {
                // render
                return () => (
                    <div class={style["control-bar"]}>
                        <div class={style["icon"]} style={{ backgroundImage: `url(${DefaultIcon})` }}></div>
                        <div class={style["title-bar"]}>{props.title}</div>
                    </div>
                );
            },
            { props: ["title"] }
        );
    }
}

export default new WindowControlBar().getComponent();
