export interface Route {
    path: string,
    pageComponent: object
}

export interface CurrentPath extends Route {
    template: string,
    eventListeners: Function[],
    props: any[]
}