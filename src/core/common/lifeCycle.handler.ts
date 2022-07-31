import { AppGlobals } from "./global.app";

export class LifeCycleHandler{
    global;
    constructor() {
        this.global = AppGlobals.getInstance();
    }

    runOnInit(){
        if(this.global.currentRoute != null  && Reflect.has(this.global.currentRoute.pageInstance, 'onInit')){
            this.global.currentRoute.pageInstance.onInit();
        }
    }

    runAfterInit(){
        if(this.global.currentRoute != null && Reflect.has(this.global.currentRoute.pageInstance, 'AfterInit')){
            this.global.currentRoute.pageInstance.AfterInit();
        }
    }

    runOnDestroy(){
        if(this.global.currentRoute != null && Reflect.has(this.global.currentRoute.pageInstance, 'onDestroy')){
            this.global.currentRoute.pageInstance.onDestroy();
        }
    }

    runOnChangeDetected(key:string, value:any, newValue: any){
        if(this.global.currentRoute != null && Reflect.has(this.global.currentRoute.pageInstance, 'onChangeDetected')){
            this.global.currentRoute.pageInstance.onChangeDetected(key,value,newValue);
        }
    }
}