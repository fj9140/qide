import { HttpContext } from "@angular/common/http";
import { ALLOW_ANONYMOUS } from "../../auth";

export function getAnonmynousOpt(){
  return {context: new HttpContext().set(ALLOW_ANONYMOUS, true)}
}
