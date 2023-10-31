/*
 * Window event constants
 * Renderer refence safe
 */
export namespace EventConstant {
    export interface EventParamsDefine {
        paramsMainToRenderer?: unknown;
        paramsRendererToMain?: unknown;
    }

    export interface EventDefine {
        name: string;
        params: EventParamsDefine;
    }

    export namespace Default {
        export const Show: EventDefine = {
            name: "default-window-show",
            params: {
                paramsMainToRenderer: undefined,
                paramsRendererToMain: undefined
            }
        };
    }

    export namespace Custom {}
}
