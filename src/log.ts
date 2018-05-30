import { appendFileSync } from 'fs';

function enter(methodPosition: any) {
    appendFileSync("log.txt", JSON.stringify(methodPosition));
}

enter({file: 2, name: 3})