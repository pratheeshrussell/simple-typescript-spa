import { inject } from "../../core/decorators/inject.decorator";
import { PageComponent } from "../../core/decorators/page.decorator";
import { BindableProps } from "../../core/interfaces/pageconf.interface";
import { DataService } from "../../services/data.service";

@PageComponent({
    template: `
        <h1>Contact Page</h1>
        <button type="button" class="btn btn-primary" 
        data-router="/">Back</button>
        <a href='/' data-router>Go Back</a>

        <div bind-innerHTML='title'></div>
        <input type="text" id="input-text" bind-value="title" event-input="valueTyped($event)"/>
        <button type="button" event-click="printServiceData">Show Log</button>
        `
})
export class ContactPage implements BindableProps{
    bindProps= { 
        title : "Some other text"
     };
     
    constructor(@inject('DataService') private dataservice:DataService){}

    onInit(){
      console.log('Contact page initialized');
    }

    onDestroy(): void {
      console.log('Contact page destroyed');
   }

     valueTyped(event:any){
        this.bindProps.title = event.target.value;
     }

     printServiceData(){
        console.log(this.dataservice.title);
     }
}