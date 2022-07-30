import { AppGlobals } from "./global.app";

export class ServiceHandler{
    createInstance(service:any){
        let global = AppGlobals.getInstance();
        let args:any = [];
        if(Reflect.has(global.pageServiceMapping,service.name)){
            global.pageServiceMapping[service.name].forEach(serviceName=>{
                args.push(global.services[serviceName]);
            });
        }
        return Reflect.construct(service,args);
    }
}