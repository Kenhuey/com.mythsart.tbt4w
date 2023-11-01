import { defineComponent, KeepAlive, VNode } from "vue";
import { RouterView } from "vue-router";
import "@renderer/style/common.scss";

export default defineComponent({
    setup: () => {
        return () => (
            <div class="window">
                asd
                {/* <RouterView
                    v-slots={{
                        default: ({ Component }: { Component: VNode }) => {
                            return <KeepAlive>{{ Component }}</KeepAlive>;
                        }
                    }}
                ></RouterView> */}
            </div>
        );
    }
});
