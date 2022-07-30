import { CurrentPath, Route } from "../interfaces/routeconf.interface";

export class AppGlobals{
    /* Start Singleton setup */
    private static instance:AppGlobals;
	private constructor(){}
	
	static getInstance(){
	    if(!AppGlobals.instance){
			this.instance = new AppGlobals();
		}
		return AppGlobals.instance;
	}
    /* End Singleton setup */

	/* Start Route Param setup */
	rootElement:HTMLElement|null = null;
	routes:Route[] = [];
	currentRoute!:CurrentPath;
	/* End Route Param setup */
	/* Start template Param setup */
	templates:any = {};
	/* End template Param setup */



}