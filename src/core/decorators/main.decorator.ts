import { AppGlobals } from "../common/global.app";
import { RouteHandler } from "../common/route.handler";
import { MainConf } from "../interfaces/mainconf.interface";

export function MainConfig(config:MainConf){
    let global = AppGlobals.getInstance();
    global.routes = config.routes;
    // Assuming Element Exists
    global.rootElement = document.getElementById(config.rootElement);
    // Instantiate services
    config.services.forEach(service=>{
        global.services[service.name] = Reflect.construct(service,[]);
    });
    return function(target: any){
        // set initial route
        let router = new RouteHandler();
        router.initialize();
        router.changeData(window.location.pathname);
    }
}