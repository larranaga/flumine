import { myEnterHook as myEnterHook, myExitHook as myExitHook } from "../hooks";
import { fromPointsMatrix, clusterArrayRep, clusterRep, Cluster, mergedClusters } from '../domain';
import { euclidean } from '../distances';
import { fromClusterDistance } from '../groupers';
import { singleLink } from '../cluster_distances';
import { points5 as points } from '../data';
const clusterDistance = singleLink(euclidean);
const grouper = fromClusterDistance(clusterDistance);
const UMBRAL = 4;
const initialClusters = points.map((point, index) => fromPointsMatrix([point], index + 1));
const clusters: Cluster[] = [];
function nearestCluster(cluster: Cluster): number | null {
    myEnterHook("{\"name\":\"nearestCluster\",\"position\":\"535\"}");
    let nearest: number | null = null;
    let minDistance = Number.MAX_VALUE;
    clusters.forEach((clusterToCompare, index) => {
        const distanceToCluster = clusterDistance(clusterToCompare, cluster);
        if (distanceToCluster < minDistance) {
            minDistance = distanceToCluster;
            nearest = index;
        }
    });
    return nearest;
    myExitHook("{\"name\":\"nearestCluster\",\"position\":\"535\"}");
}
initialClusters.forEach((singleCluster, index) => {
    let nearestIndex = nearestCluster(singleCluster);
    if (nearestIndex === null || clusterDistance(clusters[nearestIndex], singleCluster) > UMBRAL) {
        clusters.push(singleCluster);
    }
    else {
        clusters[nearestIndex] = mergedClusters(clusters[nearestIndex], singleCluster);
    }
    console.log("\nLlega el punto A" + (index + 1));
    //console.log("++++++++++++++++++++++++++");
    console.log(clusterArrayRep(clusters));
    //console.log("++++++++++++++++++++++++++");
});
