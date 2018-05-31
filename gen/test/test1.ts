import { myEnterHook as myEnterHook, myExitHook as myExitHook } from "./hooks";
export function M() {
    myEnterHook("{\"name\":\"M\",\"position\":\"0\"}");
    console.log("M");
    A();
    A();
    myExitHook("{\"name\":\"M\",\"position\":\"0\"}");
    B();
}
function A() {
    myEnterHook("{\"name\":\"A\",\"position\":\"71\"}");
    myExitHook("{\"name\":\"A\",\"position\":\"71\"}");
    console.log("A");
}
function B() {
    myEnterHook("{\"name\":\"B\",\"position\":\"110\"}");
    console.log("B");
    myExitHook("{\"name\":\"B\",\"position\":\"110\"}");
    C();
}
function C() {
    myEnterHook("{\"name\":\"C\",\"position\":\"158\"}");
    console.log("C");
    myExitHook("{\"name\":\"C\",\"position\":\"158\"}");
    D();
}
function D() {
    myEnterHook("{\"name\":\"D\",\"position\":\"206\"}");
    myExitHook("{\"name\":\"D\",\"position\":\"206\"}");
    console.log("D");
}
M();
