import { defineComponent, KeepAlive, VNode } from "vue";
import { RouterView } from "vue-router";
import style from "./index.module.scss";
import "@renderer/style/index.scss";

export default defineComponent({
    setup: () => {
        // scan window
        import.meta.glob("./**/*.tsx", {
            eager: true
        });
        // render
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
