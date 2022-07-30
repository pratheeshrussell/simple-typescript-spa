import { AppGlobals } from "./global.app";
import { AppSupport } from "./support.app";

export class TemplateHandler {
    global;
    functionBindingKey = '$functionBinding$';
    constructor() {
        this.global = AppGlobals.getInstance();
    }

    findBindings() {
        this.convertPropsToProxy();
        this.findPropBindings();
        this.findEvents();

    }

    findPropBindings() {
        this.bindToProperties('bind-innerHTML');
        this.bindToProperties('bind-innerText');
        this.bindToProperties('bind-value');
    }
    findEvents() {
        //bind to click event
        this.bindToEvent("click", "event-click");
        //bind to input event
        this.bindToEvent("input", "event-input");
    }


    bindToProperties(attr: string) {
        let props = document.querySelectorAll("[" + attr + "]");
        let actualProp = attr.replace('bind-', '');
        if (Reflect.has(this.global.currentRoute.pageInstance, 'bindProps')) {
            this.global.currentRoute.props = this.global.currentRoute.pageInstance.bindProps;
        }
        props.forEach((elm) => {
            let attribVal = elm.getAttribute(attr) ?? "";
            // could be a direct value or a function
            // If direct prop value
            if (Reflect.has(this.global.currentRoute.props, attribVal)) {
                (elm as any)[actualProp] = this.global.currentRoute.props[attribVal];

                if(!Reflect.has(this.global.currentRoute.bindings, attribVal)){
                    this.global.currentRoute.bindings[attribVal] = [];
                }
                this.global.currentRoute.bindings[attribVal].push({element: elm, attribute: actualProp});
            } else{
                //check if it is a function
                let result = this.getPropValueFromFunction(attribVal);
                (elm as any)[actualProp] = result;
                if(!Reflect.has(this.global.currentRoute.bindings,this.functionBindingKey)){
                    this.global.currentRoute.bindings[this.functionBindingKey] = [];
                }
                this.global.currentRoute.bindings[this.functionBindingKey].push
                    ({element: elm, attribute: actualProp, func: attribVal});
                
            }
        })
    }

    convertPropsToProxy() {
        if (Reflect.has(this.global.currentRoute.pageInstance, 'bindProps')) {
            let that = this;
            this.global.currentRoute.pageInstance.bindProps = new Proxy
            (this.global.currentRoute.pageInstance.bindProps, {
                set(target,key,value){
                    target[key] = value;
                    that.changeDetected(key.toString());
                    return true;
                },
                get(target,key){
                    return target[key];
                }
            });
        }
    }

    changeDetected(prop:string){
        if (Reflect.has(this.global.currentRoute.bindings, prop)) {
            this.global.currentRoute.bindings[prop].forEach((binding)=>{
                    (binding.element as any)[binding.attribute] = this.global.currentRoute.props[prop]; 
            });
        }
        if (Reflect.has(this.global.currentRoute.bindings, this.functionBindingKey)) {   
            this.global.currentRoute.bindings[this.functionBindingKey].forEach((binding)=>{      
                let result = this.getPropValueFromFunction(binding.func ?? '');
                (binding.element as any)[binding.attribute] = result;
            });
        }
    }


    
    bindToEvent(event: string, attr: string) {
        let clickEvents = document.querySelectorAll("[" + attr + "]");
        clickEvents.forEach((elm) => {

            let attribVal = elm.getAttribute(attr) ?? "";
            attribVal = attribVal.replace(/\)\s*$/, "");
            let attribSplit = attribVal.split('(');
            let attributes: any[] = [];
            if (attribSplit.length > 0) {
                let funcName = attribSplit[0];
                if (attribSplit.length > 1) {
                    attributes = attribSplit[1].split(',');
                }
                elm.addEventListener(event, (e) => {
                    //fetch changed props
                    if (Reflect.has(this.global.currentRoute.pageInstance, 'bindProps')) {
                        this.global.currentRoute.props = this.global.currentRoute.pageInstance.bindProps;
                    }
                    let newArgs = attributes.map((attrib) => {
                        try {
                            if (attrib == '$event') {
                                return e;
                            } else if (AppSupport.isEnclosedInQuotes(attrib)) {
                                return AppSupport.removeEnclosingQuotes(attrib);
                            } else if (Reflect.has(this.global.currentRoute.props, attrib)) {
                                return this.global.currentRoute.props[attrib];
                            } else if(AppSupport.isNumeric(attrib)){
                                return parseFloat(attrib);
                            } else if(AppSupport.isJsonString(attrib)){
                                return JSON.parse(attrib);
                            }
                        } catch (e) {
                            return attrib.toString();
                        }
                        return attrib.toString();
                    });
                    let funcToExecute = this.global.currentRoute.pageInstance[funcName]
                        .bind(this.global.currentRoute.pageInstance, ...newArgs);
                    funcToExecute();
                });
            }
        })
    }

    getPropValueFromFunction(attribVal: string) {
        if(attribVal.includes('(') && attribVal.includes(')')){
            attribVal = attribVal.replace(/\)\s*$/, "");
            let attribSplit = attribVal.split('(');
            let attributes: any[] = [];
            if (attribSplit.length > 0) {
                let funcName = attribSplit[0];
                if (attribSplit.length > 1) {
                    attributes = attribSplit[1].split(',');
                }
                if(Reflect.has(this.global.currentRoute.pageInstance, funcName)){
                    // process variables and get return value
                    let newArgs = attributes.map((attrib) => {
                        try {
                            if (AppSupport.isEnclosedInQuotes(attrib)) {
                                return AppSupport.removeEnclosingQuotes(attrib);
                            } else if (Reflect.has(this.global.currentRoute.props, attrib)) {
                                return this.global.currentRoute.props[attrib];
                            } else if(AppSupport.isNumeric(attrib)){
                                return parseFloat(attrib);
                            } else if(AppSupport.isJsonString(attrib)){
                                return JSON.parse(attrib);
                            }
                        } catch (e) {
                            return attrib.toString();
                        }
                        return attrib.toString();
                    });
                    let funcToExecute = this.global.currentRoute.pageInstance[funcName]
                    .bind(this.global.currentRoute.pageInstance, ...newArgs);
                    let result = funcToExecute();
                    return result;

                } else {
                    // else set it as a string
                    return attribVal.toString();
                }
            } else {
                // else set it as a string
                return attribVal.toString();
            }
        } 
    }
}