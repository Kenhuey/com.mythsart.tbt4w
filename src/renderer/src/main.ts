import { createApp } from "vue";
import GlobalWindowRouter from "./global-window-router.vue";

createApp(GlobalWindowRouter).mount("#window-frame");

function injectTest(): PropertyDecorator {
    return (target, propertyKey) => {
        // instantiate descriptor
        const value = 7777;
        const propertyDescriptor: PropertyDescriptor = Reflect.getOwnPropertyDescriptor(target, propertyKey) || {
            writable: true,
            configurable: true
        };
        propertyDescriptor.value = value;
        target[propertyKey] = value;
        // inject
        Reflect.defineProperty(target, propertyKey, propertyDescriptor);
        return propertyDescriptor;
    };
}

export class test {
    @injectTest()
    logger: number;

    constructor() {
        console.log(`test - ${this.logger}`);
        return;
    }
}

new test();
