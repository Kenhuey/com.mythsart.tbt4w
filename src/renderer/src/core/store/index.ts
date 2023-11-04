import { defineStore, storeToRefs } from "pinia";
import { IpcEventConstant } from "src/main/constant/ipc-event";

export namespace Store {
    export const useCommonUnRef = defineStore("common", {
        state: () => {
            return {
                windowStatus: { isFocusd: false, isMaximized: false } as IpcEventConstant.Default.WindowStatusType
            };
        },
        getters: {},
        actions: {}
    });

    export function useCommon() {
        return storeToRefs(useCommonUnRef());
    }
}
