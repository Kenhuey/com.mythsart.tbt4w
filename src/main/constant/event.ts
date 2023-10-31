/*
 * Window event constants
 * Renderer refence safe
 */
export namespace EventConstant {
    export interface EventParamsDefine {
        paramsRendererToMain?: unknown;
        paramsMainToRenderer?: unknown;
    }

    // TODO: 尝试用抽象类代替 例如参数就用 get，里面再封装个父类方法用于获取 type of 参数的返回类型和接收类型
    export interface EventDefine {
        name: string;
        params: EventParamsDefine;
    }

    /*
     * Window default events
     */
    export namespace Default {
        /*
         * When window action
         */
        export const Action: EventDefine = {
            // event name
            name: "default-window-action ",
            // default value
            params: {
                paramsRendererToMain: undefined,
                paramsMainToRenderer: undefined
            }
        };
    }

    export namespace Custom {}
}
