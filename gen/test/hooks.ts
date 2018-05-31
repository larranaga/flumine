export function myEnterHook(methodInfo: any) {
    console.log("Entered" + methodInfo);
}

export function myExitHook(methodInfo: any) {
    console.log("Exited" + methodInfo);
}