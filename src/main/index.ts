import { Application } from "./core/application";
import { Base } from "./core/base";

/*
 * Application entry instance
 */
@Application.Main
export class Main extends Base.Application.BaseObject implements Application.Entry {
    /*
     * Pre-initialize
     */
    constructor() {
        super("main_entrance");
    }

    public onMounted(): void {
        // done
        this.logger.info("Main mounted.");
    }
}
