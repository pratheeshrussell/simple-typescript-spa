import { PageComponent } from "../../core/decorators/page.decorator";

@PageComponent({
    template: `
        <h1>Hello From Home</h1>
        <a href='/contact' data-router>Goto Contact Page</a>
        `
})
export class HomePage{

}