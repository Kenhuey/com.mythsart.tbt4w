import { defineComponent } from "vue";
import { Base } from "@renderer/core/base";
import style from "./index.module.scss";

class Overview extends Base.Application.Component {
    public constructor() {
        super("main_over_view");
    }

    public getComponent(): any {
        return defineComponent(() => {
            // render
            return () => <div class={style["container"]}>overview</div>;
        });
    }
}

export default new Overview().getComponent();
