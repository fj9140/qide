import { HttpRequest } from "@angular/common/http"
import { Observable } from "rxjs";

export interface MockOptions{
  data?:any
}

export type RuleValue=Array<unknown>|{[key:string]:unknown}|string|((req:HttpRequest<unknown>)=>Observable<unknown>)

export interface Rules{
  [key:string]:{
    [key:string]:RuleValue
  }
}

export interface MockRule{
  method:string
  url:string
  value:RuleValue
}

export interface MockCachedRule extends MockRule{
  matcher:RegExp|null;
}

