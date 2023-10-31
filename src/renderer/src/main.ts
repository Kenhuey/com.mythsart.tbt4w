import { createApp } from "vue";
import Window from "./window";

// TODO: TSX 全局管理 等等高级一点的技术，不要滥用 setup 和模板了，太 low 了

// TODO: 异步组件、TS 版依赖注入？

// TODO: 仿造主进程做入口封装
createApp(Window).mount("#window-frame");
