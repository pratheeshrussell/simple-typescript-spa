import { AppGlobals } from "../common/global.app";
import { PageConf } from "../interfaces/pageconf.interface";

export function PageComponent(config:PageConf){
    let global = AppGlobals.getInstance();
    return function(target: any){
        let componentName = target.name;
        global.templates[componentName] = config.template;
    }
}