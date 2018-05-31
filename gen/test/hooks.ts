import { writeFileSync } from "fs";

let counter = 0;
let initial: any = {};
let final: any = {};

function update() {
    writeFileSync("table.txt", JSON.stringify({
            initial: initial,
            final: final,
        }, null, 2)
    );
}

export function myEnterHook(methodInfo: any) {
    if (! (methodInfo in initial) ){
        initial[methodInfo] = counter;
    }
    console.log(JSON.stringify(initial))
    counter++;
    update();
}

export function myExitHook(methodInfo: any) {
    final[methodInfo] = counter;
    counter++;
    update();
}