import { Injectable,inject,Injector } from "@angular/core";
import { TokenService } from "../token.service";
import { CheckSimple} from "../helper";
import { toLogin } from "../../../common/helper";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthSimpleGuardService{

  private _injector=inject(Injector)
  private router=inject(Router)

  constructor(private tokenSrv:TokenService) { }


  process(url?:string):boolean{
    const res=CheckSimple(this.tokenSrv.get());
    if(!res){
      const attemptedUrl=url||this.router.url
      toLogin(this._injector,undefined,attemptedUrl)
    }
    return res;
  }
}
