import { myEnterHook as myEnterHook, myExitHook as myExitHook } from "./hooks";
import { M } from "./test1";
function K() {
    myEnterHook("{\"name\":\"K\",\"position\":\"28\"}");
    console.log("K");
    M();
    myExitHook("{\"name\":\"K\",\"position\":\"28\"}");
}
K();
