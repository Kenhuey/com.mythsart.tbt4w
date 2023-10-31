import { Application } from "./core/application";
import { Base } from "./core/base";

/*
 * Application entry instance
 */
@Application.Main
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class Main extends Base.Application.BaseObject implements Application.Entry {
    /*
     * Pre-initialize
     */
    constructor() {
        super("entrance");
    }

    public onMounted(): void {
        this.logger.info("Mounted.");
    }
}
