export interface onInit{
    onInit():void
}

export interface AfterInit{
    AfterInit():void
}

export interface onDestroy{
    onDestroy():void
}

export interface onChangeDetected{
    onChangeDetected(key:(string|symbol), value:any, newValue: any):void
}