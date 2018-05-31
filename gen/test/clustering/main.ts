import { myEnterHook as myEnterHook, myExitHook as myExitHook } from "./hooks";
import { fromPointsMatrix, clusterArrayRep } from './domain';
import { ward } from './distances';
import { fromClusterDistance } from './groupers';
import { averageLink } from './cluster_distances';
import { points10 as points, point10_names as names } from './data';
const clusterDistance = averageLink(ward);
const grouper = fromClusterDistance(clusterDistance);
let clusters = points.map((point, index) => fromPointsMatrix([point], index + 1));
while (clusters.length > 1) {
    clusters = grouper.doIteration(clusters);
    console.log("++++++++++++++++++++++++++++++++++++++++");
    console.log(clusterArrayRep(clusters));
    console.log("++++++++++++++++++++++++++++++++++++++++");
}
