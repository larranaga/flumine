import { myEnterHook as myEnterHook, myExitHook as myExitHook } from "./hooks";
import { DataInstance, Cluster } from './domain';
export type DistanceFunction = (data1: DataInstance, data2: DataInstance) => number;
export function euclidean(data1: DataInstance, data2: DataInstance): number {
    myEnterHook("{\"name\":\"euclidean\",\"position\":\"135\"}");
    const squaredDistance = data1.data.reduce((acc, value, index) => {
        return acc + (value - data2.data[index]) * (value - data2.data[index]);
    }, 0);
    myExitHook("{\"name\":\"euclidean\",\"position\":\"135\"}");
    return Math.sqrt(squaredDistance);
}
export function rao(data1: DataInstance, data2: DataInstance): number {
    myEnterHook("{\"name\":\"rao\",\"position\":\"420\"}");
    let oneCoincidences = 0;
    data1.data.forEach((value1, index) => {
        const value2 = data2.data[index];
        if (value1 === value2 && value1 === 1) {
            oneCoincidences += 1;
        }
    });
    myExitHook("{\"name\":\"rao\",\"position\":\"420\"}");
    return 1 - (oneCoincidences / data1.data.length);
}
export function simpleMatchingCoefficient(data1: DataInstance, data2: DataInstance): number {
    myEnterHook("{\"name\":\"simpleMatchingCoefficient\",\"position\":\"770\"}");
    let oneCoincidences = 0;
    data1.data.forEach((value1, index) => {
        const value2 = data2.data[index];
        if (value1 === value2) {
            oneCoincidences += 1;
        }
    });
    myExitHook("{\"name\":\"simpleMatchingCoefficient\",\"position\":\"770\"}");
    return 1 - (oneCoincidences / data1.data.length);
}
export function ward(data1: DataInstance, data2: DataInstance): number {
    myEnterHook("{\"name\":\"ward\",\"position\":\"1126\"}");
    const euclideanDistance = euclidean(data1, data2);
    myExitHook("{\"name\":\"ward\",\"position\":\"1126\"}");
    return euclideanDistance * euclideanDistance;
}
