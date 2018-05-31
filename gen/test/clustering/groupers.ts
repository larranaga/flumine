import { myEnterHook as myEnterHook, myExitHook as myExitHook } from "./hooks";
import { Cluster, reducedClusters } from "./domain";
import { ClusterDistance } from './cluster_distances';
type IterationFunction = (original: Cluster[]) => Cluster[];
export interface Grouper {
    doIteration: IterationFunction;
}
export function fromClusterDistance(distance: ClusterDistance): Grouper {
    myEnterHook("{\"name\":\"fromClusterDistance\",\"position\":\"235\"}");
    myExitHook("{\"name\":\"fromClusterDistance\",\"position\":\"235\"}");
    return new GrouperImp(distance);
}
class GrouperImp implements Grouper {
    private distance: ClusterDistance;
    public constructor(distance: ClusterDistance) {
        this.distance = distance;
    }
    public doIteration(clusters: Cluster[]): Cluster[] {
        if (clusters.length === 1) {
            return clusters;
        }
        else {
            let clusterA = null;
            let clusterB = null;
            let minDistance = Number.MAX_VALUE;
            clusters.forEach((cluster1, index1) => {
                clusters.forEach((cluster2, index2) => {
                    if (index1 !== index2) {
                        const currDistance = this.distance(cluster1, cluster2);
                        if (currDistance < minDistance) {
                            clusterA = cluster1;
                            clusterB = cluster2;
                            minDistance = currDistance;
                        }
                    }
                });
            });
            return reducedClusters(clusters, clusterA, clusterB);
        }
    }
}
