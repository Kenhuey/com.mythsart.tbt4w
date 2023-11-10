import { defineComponent } from "vue";
import { Base } from "@renderer/core/base";
import style from "./index.module.scss";

class Overview extends Base.Application.Component {
    public constructor() {
        super("setting_over_view");
    }

    public getComponent(): any {
        const test = [0];
        for (let i = 1; i < 100; i++) {
            test.push(i);
        }
        return defineComponent(() => {
            // render
            return () => (
                <div class={style["container"]}>
                    <div class={style["title-container"]}>
                        <div class={style["title"]}>User List</div>
                        <div class={style["sub-title"]}>9 Records</div>
                    </div>
                    <div class={[style["list-container"], "default-scroll "]}>
                        TODO: 自设表格（筛选），标题栏添加账号按钮按钮按钮按钮按钮按钮按钮按钮按钮按钮按钮按钮按钮按钮按钮按钮按钮按钮按钮按钮按钮按钮按钮按钮按钮按钮按钮按钮按钮按钮按钮
                        {test.map((v) => (
                            <div
                                style={{
                                    width: "100%",
                                    background: "#eee",
                                    marginTop: "2px"
                                }}
                            >
                                {v}
                            </div>
                        ))}
                    </div>
                </div>
            );
        });
    }
}

export default new Overview().getComponent();
