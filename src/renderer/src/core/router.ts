import { LoggerFactory } from "./application/logger";
import { Base } from "./base";
import { Router as VueRouter, RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";

// TODO: 用扫描，不然每创建一个窗口都要在入口文件import一次，跟没封装没区别

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
        logger.info(`Add window route "${windowRecord.raw.name as string}" with path "#${windowRecord.raw.path}".`);
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
