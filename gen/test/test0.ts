import { myEnterHook as myEnterHook, myExitHook as myExitHook } from "./hooks";
function someFunction() {
    myEnterHook("{\"name\":\"someFunction\",\"position\":\"0\"}");
    console.log("Hello!!");
    function someOtherFuncion() {
        myEnterHook("{\"name\":\"someOtherFuncion\",\"position\":\"54\"}");
        myExitHook("{\"name\":\"someOtherFuncion\",\"position\":\"54\"}");
        console.log("That other function");
    }
    someOtherFuncion();
    myExitHook("{\"name\":\"someFunction\",\"position\":\"0\"}");
    someOtherFuncion();
}
someFunction();
