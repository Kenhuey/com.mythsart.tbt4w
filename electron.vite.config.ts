import { resolve } from "path";
import { defineConfig, externalizeDepsPlugin, bytecodePlugin, swcPlugin } from "electron-vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

const _plugins = [externalizeDepsPlugin(), bytecodePlugin()];

export default defineConfig({
    main: {
        plugins: [..._plugins, swcPlugin()]
    },
    preload: {
        plugins: [..._plugins]
    },
    renderer: {
        resolve: {
            alias: {
                "@renderer": resolve("src/renderer/src")
            }
        },
        plugins: [
            ..._plugins,
            vue(),
            vueJsx({
                babelPlugins: [["@babel/plugin-proposal-decorators", { legacy: true }]]
            })
        ]
    }
});
