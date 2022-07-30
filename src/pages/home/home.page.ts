import { PageComponent } from "../../core/decorators/page.decorator";
import { BindableProps } from "../../core/interfaces/pageconf.interface";

@PageComponent({
    template: `
        <h1>Hello From Home</h1>
        <a href='/contact' data-router>Goto Contact Page</a>
        <div bind-innerHTML='getTitle()'></div>
        <input type="text" id="input-text" bind-value="title" event-input="valueTyped($event)"/>
        <button type="button" event-click="showAlert($event,title)">Change Text</button>
        `
})
export class HomePage implements BindableProps{
    bindProps={
        title : "Home Page"
    };

    showAlert(e:any,msg:string){
       console.log(msg);
       this.bindProps.title = 'Working!!';
    }

    valueTyped(e:any){
        this.bindProps.title =(e.target.value);
    }

    getTitle(){
        return this.bindProps.title;
    }
}