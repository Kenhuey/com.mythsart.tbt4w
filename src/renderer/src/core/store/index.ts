import { defineStore, storeToRefs } from "pinia";
import { IpcEventConstant } from "../../../../main/constant/ipc-event";
import { Hook } from "../hook";

/**
 * Store core
 */
export namespace Store {
    /**
     * States
     */
    export namespace State {
        /**
         * Renderer entry instance
         */
        abstract class BaseState {
            /**
             * Get default state value
             */
            public abstract get value(): any;
        }

        /**
         * Window status
         */
        export class WindowStatus extends BaseState {
            public get value(): IpcEventConstant.Default.WindowStatusType {
                new IpcEventConstant.Default.WindowStatus({}, Hook.ipcRenderer).rendererSendToMainSync();
                return {
                    is: {
                        minimize: false,
                        maximize: false,
                        focus: false
                    },
                    allow: {
                        minimize: false,
                        maximize: false,
                        close: false
                    },
                    invisibleNonAllowedAction: false
                };
            }
        }
    }

    export const useCommonUnRef = defineStore("common", {
        state: () => {
            return {
                windowStatus: new State.WindowStatus().value
            };
        },
        getters: {},
        actions: {}
    });

    export function useCommon() {
        return storeToRefs(useCommonUnRef());
    }
}
