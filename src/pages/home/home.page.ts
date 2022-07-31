import { inject } from "../../core/decorators/inject.decorator";
import { PageComponent } from "../../core/decorators/page.decorator";
import { AfterInit, onChangeDetected, onDestroy, onInit } from "../../core/interfaces/lifecycle.interface";
import { BindableProps } from "../../core/interfaces/pageconf.interface";
import { DataService } from "../../services/data.service";

@PageComponent({
    template: `
        <h1>Hello From Home</h1>
        <a href='/contact' data-router>Goto Contact Page</a>
        <div bind-innerHTML='getTitle()'></div>
        <input type="text" id="input-text" bind-value="title" event-input="valueTyped($event)"/>
        <br>
        <button type="button" event-click="changeMsg($event,title)">Change Text</button>
        `
})
export class HomePage implements BindableProps,onInit,AfterInit,onDestroy,onChangeDetected {
    bindProps={
        title : "Home Page"
    };
    onInit(){
        console.log('Home onInit');
    }

    AfterInit(){
        console.log('Home AfterInit');
    }
    onDestroy(): void {
        console.log('Home onDestroy');
    }
    onChangeDetected(key:string, value:any, newValue: any){
        console.log('onChangeDetected');
        console.log(key, ' is being changed from ' ,value, ' to ', newValue);
    }

    constructor(@inject('DataService') private dataservice:DataService){}

    changeMsg(e:any,msg:string){
       this.bindProps.title = 'Working!!';
    }

    valueTyped(e:any){
        this.bindProps.title =(e.target.value);
        this.dataservice.title = (e.target.value);
    }

    getTitle(){
        return this.bindProps.title;
    }
}