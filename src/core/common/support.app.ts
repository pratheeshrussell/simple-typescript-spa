export class AppSupport{
    static isEnclosedInQuotes(str:string){
        return ((str.startsWith('"') && str.endsWith('"')) || 
        (str.startsWith("'") && str.endsWith("'")) || 
        (str.startsWith("`") && str.endsWith("`")));     
    }
    static removeEnclosingQuotes(str:string){
        return str.replace(/^["'`]|['"`]$/g, '');
    }

    static isNumeric(n:string){
        try{
            return !isNaN(parseFloat(n)) && isFinite(parseFloat(n));
        } catch(e){
            return false;
        }
      }
   static isJsonString(str:string) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }
}