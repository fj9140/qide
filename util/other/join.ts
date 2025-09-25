
export function join(...paths:string[]){
  return paths.join('[++/++Qab]').replace(/\[\+\+\/\+\+Qab\]\/*/g,'/')
}
