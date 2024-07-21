import { Injector } from "@angular/core";
import { Router } from "@angular/router";
import { QA_SERVICE_TOKEN } from "@qide/auth";

export function goTo(injector:Injector ,url:string|undefined):void{
  setTimeout(()=>{
    if(url){
      injector.get(Router).navigateByUrl(url);
    }
  })
}

export function toLogin(injector:Injector):void{
  goTo(injector,injector.get(QA_SERVICE_TOKEN).login_url)
}
