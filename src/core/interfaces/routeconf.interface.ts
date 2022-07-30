export interface Route {
    path: string,
    pageComponent: any
}

export interface CurrentPath extends Route {
    pageInstance:any,
    template: string,
    eventListeners: Function[],
    props: {
        [key:string]:string
    },
    bindings:{
        [key:string]:BindingsObj[]
    }
}

export interface BindingsObj{
    element:Element,
    attribute:string,
    func?:string
}