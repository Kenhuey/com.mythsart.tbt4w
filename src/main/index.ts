import "reflect-metadata";
import { Application, LoggerFactory } from "./application";

@Application.Main
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class Main extends Application.Entry {
    // @LoggerFactory.inject("main", true)
    public readonly logger!: number;

    constructor() {
        super();
    }

    public onMounted(): void {
        // console.log(this.logger);
        // this.logger.info("Mounted.");
    }
}

function setDefaultValue(target: Object, propertyName: string) {
    // console.log(`target[propertyName] = ${target[propertyName]}`);
    // const _od = Reflect.getOwnPropertyDescriptor(target, propertyName);
    // console.debug(`od = ${_od}`);
    // target[propertyName] = 888;
    const propertyDescriptor: PropertyDescriptor = Reflect.getOwnPropertyDescriptor(target, propertyName) || {
        writable: true,
        configurable: true
    };
    propertyDescriptor.value = 8088;
    Reflect.defineProperty(target, propertyName, propertyDescriptor);
}

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
