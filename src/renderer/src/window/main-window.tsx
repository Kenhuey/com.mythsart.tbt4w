import { defineComponent } from "vue";

// TODO: 装饰器自动注册 window
export default defineComponent({
    setup: () => {
        return () => <div>Main Window</div>;
    }
});
