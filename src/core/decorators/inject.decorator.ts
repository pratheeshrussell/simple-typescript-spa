import { AppGlobals } from "../common/global.app";

export function inject(serviceName:string){
    let global = AppGlobals.getInstance();
    return function(constructor:any, paramName:string | symbol,paramPosition:number){
        if(!Reflect.has(global.pageServiceMapping,constructor.name)){
            global.pageServiceMapping[constructor.name] = [];
        }
        global.pageServiceMapping[constructor.name][paramPosition]=serviceName;
    }
}