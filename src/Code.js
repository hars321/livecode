import Monaco from './Monaco/index';
var code;

export function getCode(){
    return code;
}
export function setCode(data){
    console.log(data)
    code=data
    console.log(Monaco)
}