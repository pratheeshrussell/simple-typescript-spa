import { Route } from "../interfaces/routeconf.interface";
import { AppGlobals } from "./global.app";
import { ServiceHandler } from "./service.handler";
import { TemplateHandler } from "./template.handler";

export class RouteHandler{
    initialize(){
        // handles going back
        window.addEventListener('popstate', () => {
            this.changeData(window.location.pathname);
        });
    }


    routerHandler(event:any) {
        event.preventDefault();
        let eventTag = (event.target.tagName as String).toLowerCase();
        let href = event.target.getAttribute("data-router");
        if(eventTag == "a" && !href){
            href = event.target.href;
        } 
        if(href != null){
            this.changeData(href);
        }
   }

   changeData(href:string){
        let global = AppGlobals.getInstance();
        let servicehandler = new ServiceHandler();
        history.pushState({}, 'newUrl', href);

        // use window.location.pathname to compare
        // else it is considering from http://domain/
        let route:Route|undefined = global.routes.find(
            route => route.path.replace(/^,/, '') ==  
            window.location.pathname.replace(/^,/, '')); 
           
        if(route){
           // Seriously?? the worst type casting ever!!
           let componentName = (route.pageComponent as any).name;
           if(global.rootElement != null){
            /* Reset currentRoute Object */
            global.currentRoute = {
                path: route.path,
                pageComponent: route.pageComponent,
                pageInstance: servicehandler.createInstance(route.pageComponent),
                template: global.templates[componentName],
                eventListeners:[],
                props:{},
                bindings:{}
            }
            /* ======================== */
            global.rootElement.innerHTML = global.currentRoute.template;
            this.processTemplate();
           }          
        }
   }

   processTemplate(){
    let templateHandler = new TemplateHandler();
    this.changeAnchorListeners();
    templateHandler.findBindings();
   }

   changeAnchorListeners(){
    let routerElms = document.querySelectorAll("[data-router]");
    routerElms.forEach((elm) => {
          elm.addEventListener("click", (e) => {
            this.routerHandler(e);
          });
        
      });
   }

}