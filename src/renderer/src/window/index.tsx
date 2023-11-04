import { defineComponent, KeepAlive, VNode } from "vue";
import { RouterView } from "vue-router";
import "@renderer/style/index.scss";
import style from "./index.module.scss";

export default defineComponent({
    setup: () => {
        return () => (
            <div class={style["window"]}>
                <div class={style["router-view"]}>
                    <RouterView
                        v-slots={{
                            default: ({ Component }: { Component: VNode }) => <KeepAlive>{Component}</KeepAlive>
                        }}
                    />
                </div>
            </div>
        );
    }
});
