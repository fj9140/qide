import { Injector } from "@angular/core";
import { Router } from "@angular/router";
import { QA_SERVICE_TOKEN } from "@qide/auth";

export function goTo(injector:Injector ,url:string|undefined,message:string|undefined,data?:{[key:string]:unknown}):void{
  setTimeout(()=>{
    if(url){
      injector.get(Router).navigateByUrl(url,{
        info:message,
        state:{
          ...data
        }
      });
    }
  })
}

export function toLogin(injector:Injector,message:string="",backUrl?:string):void{
  goTo(injector,injector.get(QA_SERVICE_TOKEN).login_url,message,{backUrl})
}
