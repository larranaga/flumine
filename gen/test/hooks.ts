import { writeFileSync } from "fs";

let counter = 1;
let initial: any = {};
let final: any = {};

function getImpactSet(functionName: any) {
    const set = [];
    for (let x in initial) {
        if(initial[functionName] <= final[x]){
            set.push(x);
        }
    };
    return set;
}

function update() {
    const sets: any = {};
    for(let y in initial){
        sets[y] = getImpactSet(y);
    }

    writeFileSync("table.txt", JSON.stringify({
            sets: sets,
            initial: initial,
            final: final,
        }, null, 2)
    );
}

export function myEnterHook(methodInfo: any) {
    methodInfo = JSON.parse(methodInfo).name;
    if (! (methodInfo in initial) ){
        initial[methodInfo] = counter;
    }
    //console.log(JSON.stringify(initial))
    counter++;
    update();
}

export function myExitHook(methodInfo: any) {
    methodInfo = JSON.parse(methodInfo).name;
    final[methodInfo] = counter;
    counter++;
    update();
}