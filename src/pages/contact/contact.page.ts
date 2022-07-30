import { PageComponent } from "../../core/decorators/page.decorator";
import { BindableProps } from "../../core/interfaces/pageconf.interface";

@PageComponent({
    template: `
        <h1>Contact Page</h1>
        <button type="button" class="btn btn-primary" 
        data-router="/">Back</button>
        <a href='/' data-router>Go Back</a>

        <div bind-innerHTML='title'></div>
        <input type="text" id="input-text" bind-value="title" event-input="valueTyped($event)"/>
        `
})
export class ContactPage implements BindableProps{
    bindProps= { 
        title : "Some other text"
     };
     valueTyped(event:any){
        this.bindProps.title = event.target.value;
     }
}