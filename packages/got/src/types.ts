import type Request from "./core/index";


export type GotReturn=Request

export type HTTPAlias='post'

export type InstanceDefaults={

}


export type Got={}&Record<HTTPAlias,GotRequestFunction<GotOptions>>
