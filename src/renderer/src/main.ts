import { createApp } from "vue";
import GlobalWindowRouter from "./global-window-router.vue";

// TODO: TSX 全局管理 等等高级一点的技术，不要滥用setup和模板了，太low了

// TODO: 异步组件、ts版依赖注入？

// TODO: 仿造主进程做入口封装
createApp(GlobalWindowRouter).mount("#window-frame");
