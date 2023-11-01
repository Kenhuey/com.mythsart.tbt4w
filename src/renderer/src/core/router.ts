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
