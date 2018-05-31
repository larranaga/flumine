import { myEnterHook as myEnterHook, myExitHook as myExitHook } from "./hooks";
export function M() {
    myEnterHook("{\"name\":\"M\",\"position\":\"0\"}");
    console.log("M");
    A();
    A();
    B();
    myExitHook("{\"name\":\"M\",\"position\":\"0\"}");
}
function A() {
    myEnterHook("{\"name\":\"A\",\"position\":\"71\"}");
    console.log("A");
    myExitHook("{\"name\":\"A\",\"position\":\"71\"}");
}
function B() {
    myEnterHook("{\"name\":\"B\",\"position\":\"110\"}");
    console.log("B");
    C();
    myExitHook("{\"name\":\"B\",\"position\":\"110\"}");
}
function C() {
    myEnterHook("{\"name\":\"C\",\"position\":\"158\"}");
    console.log("C");
    D();
    myExitHook("{\"name\":\"C\",\"position\":\"158\"}");
}
function D() {
    myEnterHook("{\"name\":\"D\",\"position\":\"206\"}");
    console.log("D");
    myExitHook("{\"name\":\"D\",\"position\":\"206\"}");
}
M();
