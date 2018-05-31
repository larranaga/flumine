class Table {
    private counter: number;
    private initial: Map<any, any>;
    private final: Map<any, any>;

    public constructor() {
        this.counter = 0;
        this.initial = new Map();
        this.final = new Map();
    }
}

let counter = 0;

export function myEnterHook(methodInfo: any) {
    console.log("Entered" + methodInfo + " c: " + counter);
    counter++;
}

export function myExitHook(methodInfo: any) {
    console.log("Exited" + methodInfo + " c: " + counter);
    counter++;
}