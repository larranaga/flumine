import { myEnterHook as myEnterHook, myExitHook as myExitHook } from "../hooks";
const data = [6, 12, 18, 24, 30, 42, 48];
let centroids = [18, 45];
const new_centroids = [1e8, 1e8];
let number_of_iterations = 0;
let group_0: number[] = [];
let group_1: number[] = [];
function centroid_change() {
    myEnterHook("{\"name\":\"centroid_change\",\"position\":\"187\"}");
    myExitHook("{\"name\":\"centroid_change\",\"position\":\"187\"}");
    return centroids.reduce((maxSoFar, value, index) => {
        return Math.max(maxSoFar, Math.abs(value - new_centroids[index]));
    }, 0);
}
while (true) {
    number_of_iterations += 1;
    group_0 = [];
    group_1 = [];
    data.forEach(value => {
        const dist_to_0 = Math.abs(value - centroids[0]);
        const dist_to_1 = Math.abs(value - centroids[1]);
        if (dist_to_0 < dist_to_1) {
            group_0.push(value);
        }
        else {
            group_1.push(value);
        }
    });
    new_centroids[0] = group_0.reduce((prev, value) => {
        return prev + value;
    }, 0) / group_0.length;
    new_centroids[1] = group_1.reduce((prev, value) => {
        return prev + value;
    }, 0) / group_1.length;
    if (centroid_change() < 1e-8) {
        break;
    }
    else {
        console.log(new_centroids.join(",, "));
        centroids = new_centroids;
    }
}
console.log(number_of_iterations);
console.log(centroids[0] + ", " + centroids[1]);
console.log(group_0.join(", "));
console.log(group_1.join(", "));
