import { rao, simpleMatchingCoefficient } from './distances';

const raoValue = rao(
    {data: [1, 0, 1, 0, 0, 1, 1, 1, 1, 0], name: ""},
    {data: [1, 1, 1, 1, 0, 0, 0, 0, 1, 0,],name: ""}
);

if( Math.abs(raoValue - 0.7) > 1e-8 ){
    console.log("Rao failed");   
} else {
    console.log("Rao passed");
}

const simpleMatchingValue = simpleMatchingCoefficient(
    {data: [1, 0, 1, 0, 0, 1, 1, 1, 1, 0], name: ""},
    {data: [1, 1, 1, 1, 0, 1, 0, 0, 1, 0],name: ""}
);

if( Math.abs(simpleMatchingValue - 0.4) > 1e-8 ){
    console.log("simpleMatchingValue failed");   
} else {
    console.log("simpleMatchingValue passed");
}
