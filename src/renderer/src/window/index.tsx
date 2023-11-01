import { defineComponent, KeepAlive, VNode } from "vue";
import { RouterView } from "vue-router";
import "@renderer/style/common.scss";

export default defineComponent({
    setup: () => {
        return () => (
            <div class="window">
                <div class="router-view">
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
