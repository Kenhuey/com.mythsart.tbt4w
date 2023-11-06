import { defineComponent } from "vue";
import { Base } from "@renderer/core/base";
import style from "./index.module.scss";

class Overview extends Base.Application.Component {
    public constructor() {
        super("setting_over_view");
    }

    public getComponent(): any {
        return defineComponent(() => {
            // render
            return () => (
                <div class={style["container"]}>
                    <div class={style["title-container"]}>
                        <div class={style["title"]}>User List</div>
                        <div class={style["sub-title"]}>9 Records</div>
                    </div>
                    TODO: 自设表格（筛选），标题栏添加账号按钮
                </div>
            );
        });
    }
}

export default new Overview().getComponent();
