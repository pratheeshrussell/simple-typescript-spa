import { PageComponent } from "../../core/decorators/page.decorator";

@PageComponent({
    template: `
        <h1>Contact Page</h1>
        <button type="button" class="btn btn-primary" 
        data-router="/">Back</button>
        <a href='/' data-router>Go Back</a>
        `
})
export class ContactPage{

}