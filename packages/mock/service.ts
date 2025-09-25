import { Injectable,Optional,Inject } from "@angular/core";
import { MockOptions } from "./interface";
import { QIDE_MOCK_CONFIG } from "./provide";
import { MockRule,MockCachedRule,Rules,RuleValue } from "./interface";

@Injectable({providedIn:'root'})
export class MockService{
  private cached:MockCachedRule[]=[]

  constructor(@Optional() @Inject(QIDE_MOCK_CONFIG) options?:MockOptions){
    this.setData(options?.data)
  }

  setData(data:Rules):void{
    this._applyMock(data)
  }

  private _applyMock(data:Rules):void{
    this.cached=[]
    try{
      this._realApplyMock(data)
    }catch(e){

    }
  }

  private _realApplyMock(data:Rules):void{
    if (!data){
      return
    }
    Object.keys(data).forEach(rulesKey=>{
      const rules=data[rulesKey]
      Object.keys(data[rulesKey]).forEach(ruleKey=>{
        const rule=this._genRule(ruleKey,rules[ruleKey])
        if(['GET','POST','PUT','DELETE','PATCH','OPTIONS'].indexOf(rule.method)===-1){
          throw Error(`method of ${ruleKey}-${ruleKey} is not valid`);
        }

        const cachedRule=this.cached.find((r)=>{
          return r.url===rule.url && r.method===rule.method
        })
        if(cachedRule){
          cachedRule.value=rule.value
        }else{
          this.cached.push(rule)
        }
      })
    })
  }

  private _genRule(key:string,value:RuleValue):MockCachedRule{
    let method="GET"
    let url=key;
    let matcher:RegExp|null=null

    if (key.indexOf(' ')>-1){
      const splited=key.split(' ')
      method=splited[0]
      url=splited[1]
    }

      let segments: string[] = [];
    if (~url.indexOf(':')) {
      segments = url!
        .split('/')
        .filter(segment => segment.startsWith(':'))
        .map(v => v.substring(1));
      const reStr = url!
        .split('/')
        .map(segment => (segment.startsWith(':') ? `([^/]+)` : segment))
        .join('/');
      matcher = new RegExp(`^${reStr}`, 'i');
    } else if (/(\([^)]+\))/i.test(url)) {
      matcher = new RegExp(url, 'i');
    }

    return {
      method:method.toUpperCase(),
      url,
      value,
      matcher
    }
  }

  getRule(method:string,url:string):MockRule|null{
    method=(method||'GET').toUpperCase()
    const ruleList=this.cached.filter(cachedRule=>{
      return (cachedRule.matcher?cachedRule.matcher.test(url):cachedRule.url===url) && cachedRule.method===method
    })
    if(ruleList.length===0){
      return null
    }
    return {
      url,
      method,
      value:ruleList[0].value
    }
  }
}
