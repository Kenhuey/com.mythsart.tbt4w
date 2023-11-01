import { LoggerFactory } from "./application/logger";
import { Base } from "./base";
import { Router as VueRouter, RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";

/*
 * Router core
 */
export namespace Router {
    /*
     * Inner logger
     */
    const logger: LoggerFactory.Logger = LoggerFactory.Logger.getLogger("route");

    /*
     * All routes
     */
    const routes: Array<RouteRecordRaw> = [];

    /*
     * Window object decorator
     */
    export function Window<T extends { new (): Base.Application.WindowRouteRecord }>(constructor: T): void {
        const windowRecord: Base.Application.WindowRouteRecord = new constructor();
        routes.push(windowRecord.raw);
        logger.info(`${windowRecord.raw.name as string}`);
        // TODO: 这B玩意儿装饰器用了之后没被调用，有bug
    }

    /*
     * Get all window raw routes
     */
    export function getRawWindowRoutes(): Array<RouteRecordRaw> {
        return routes;
    }

    /*
     * Get window router
     */
    export function getWindowRouter(): VueRouter {
        return createRouter({
            history: createWebHashHistory(),
            routes
        });
    }
}
