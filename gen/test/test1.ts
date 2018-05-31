import { myEnterHook as myEnterHook, myExitHook as myExitHook } from "./hooks";
function M() {
    myEnterHook("{\"name\":\"M\",\"position\":\"0\"}");
    console.log("M");
    A();
    A();
    B();
    myExitHook("{\"name\":\"M\",\"position\":\"0\"}");
}
function A() {
    myEnterHook("{\"name\":\"A\",\"position\":\"64\"}");
    console.log("A");
    myExitHook("{\"name\":\"A\",\"position\":\"64\"}");
}
function B() {
    myEnterHook("{\"name\":\"B\",\"position\":\"103\"}");
    console.log("B");
    C();
    myExitHook("{\"name\":\"B\",\"position\":\"103\"}");
}
function C() {
    myEnterHook("{\"name\":\"C\",\"position\":\"151\"}");
    console.log("C");
    D();
    myExitHook("{\"name\":\"C\",\"position\":\"151\"}");
}
function D() {
    myEnterHook("{\"name\":\"D\",\"position\":\"199\"}");
    console.log("D");
    myExitHook("{\"name\":\"D\",\"position\":\"199\"}");
}
M();
