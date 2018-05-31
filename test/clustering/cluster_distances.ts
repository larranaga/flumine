import { Cluster } from './domain';
import { DistanceFunction } from './distances';

export type ClusterDistance = (cluster1: Cluster, cluster2: Cluster) => number;

export function singleLink(pointDistance: DistanceFunction): ClusterDistance {
    const SingleLinkImp: ClusterDistance = (cluster1: Cluster, cluster2: Cluster) => {
        let minDistance = Number.MAX_VALUE;

        cluster1.instances.forEach( (instance1) => {
            cluster2.instances.forEach( (instance2) => {
                minDistance = Math.min( pointDistance(instance1, instance2), minDistance );
            });
        });

        return minDistance;
    }
    
    return SingleLinkImp;
}

export function completeLink(pointDistance: DistanceFunction): ClusterDistance {
    const completeLinkImp: ClusterDistance = (cluster1: Cluster, cluster2: Cluster) => {
        let maxDistance = 0;

        cluster1.instances.forEach( (instance1) => {
            cluster2.instances.forEach( (instance2) => {
                maxDistance = Math.max( pointDistance(instance1, instance2), maxDistance );
            });
        });

        return maxDistance;
    }
    
    return completeLinkImp;
}

export function averageLink(pointDistance: DistanceFunction): ClusterDistance {
    const averageLinkImp: ClusterDistance = (cluster1: Cluster, cluster2: Cluster) => {
        let sumOfDistances = 0;

        cluster1.instances.forEach( (instance1) => {
            cluster2.instances.forEach( (instance2) => {
                sumOfDistances += pointDistance(instance1, instance2);
            });
        });

        return sumOfDistances / (cluster1.size() * cluster2.size());
    };

    return averageLinkImp;
}

export function centroidLink(pointDistance: DistanceFunction): ClusterDistance {
    const centroidLinkImp: ClusterDistance = (cluster1: Cluster, cluster2: Cluster) => {
        return pointDistance(cluster1.centroid(), cluster2.centroid());
    };

    return centroidLinkImp;
}
