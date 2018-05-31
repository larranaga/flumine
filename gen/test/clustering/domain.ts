import { myEnterHook as myEnterHook, myExitHook as myExitHook } from "./hooks";
export interface DataInstance {
    data: number[];
    name: string;
}
export interface Cluster {
    instances: DataInstance[];
    size(): number;
    centroid(): DataInstance;
}
export function fromPointsMatrix(dataMatrix: number[][], indexNumber: number): Cluster {
    myEnterHook("{\"name\":\"fromPointsMatrix\",\"position\":\"181\"}");
    return new ClusterImp(dataMatrix, indexNumber);
    myExitHook("{\"name\":\"fromPointsMatrix\",\"position\":\"181\"}");
}
export function fromPointsMatrixAndName(dataMatrix: number[][], name: string): Cluster {
    myEnterHook("{\"name\":\"fromPointsMatrixAndName\",\"position\":\"324\"}");
    const cluster = new ClusterImp(dataMatrix);
    cluster.instances[0].name = name;
    return cluster;
    myExitHook("{\"name\":\"fromPointsMatrixAndName\",\"position\":\"324\"}");
}
export function reducedClusters(clusters: Cluster[], clusterA: Cluster | null, clusterB: Cluster | null): Cluster[] {
    myEnterHook("{\"name\":\"reducedClusters\",\"position\":\"521\"}");
    if (clusterA !== null && clusterB !== null) {
        let newClusters: Cluster[] = [];
        clusters.forEach((cluster) => {
            if (cluster !== clusterA && cluster !== clusterB) {
                newClusters.push(cluster);
            }
        });
        newClusters.push(mergedClusters(clusterA, clusterB));
        return newClusters;
    }
    else {
        return [];
    }
    myExitHook("{\"name\":\"reducedClusters\",\"position\":\"521\"}");
}
export function clusterArrayRep(clusters: Cluster[]): string {
    myEnterHook("{\"name\":\"clusterArrayRep\",\"position\":\"1034\"}");
    return clusters.map(clusterRep).join("\n\n");
    myExitHook("{\"name\":\"clusterArrayRep\",\"position\":\"1034\"}");
}
export function clusterRep(cluster: Cluster): string {
    myEnterHook("{\"name\":\"clusterRep\",\"position\":\"1151\"}");
    return "[" + cluster.instances.map(instanceRep).join(", ") + "]";
    myExitHook("{\"name\":\"clusterRep\",\"position\":\"1151\"}");
}
function instanceRep(instance: DataInstance): string {
    myEnterHook("{\"name\":\"instanceRep\",\"position\":\"1279\"}");
    //return instance.data.join(", ") + ": " + instance.name;
    return instance.name;
    myExitHook("{\"name\":\"instanceRep\",\"position\":\"1279\"}");
}
export function mergedClusters(clusterA: Cluster, clusterB: Cluster): Cluster {
    myEnterHook("{\"name\":\"mergedClusters\",\"position\":\"1425\"}");
    const instances = clusterA.instances.concat(clusterB.instances);
    const newCluster = new ClusterImp();
    newCluster.instances = instances;
    return newCluster;
    myExitHook("{\"name\":\"mergedClusters\",\"position\":\"1425\"}");
}
class ClusterImp implements Cluster {
    public instances: DataInstance[];
    public constructor(dataMatrix: number[][] = [], indexNumber: number = -1) {
        this.instances = [];
        dataMatrix.forEach((dataPoint) => {
            this.instances.push({
                data: dataPoint,
                name: "A" + indexNumber,
            });
        });
    }
    public size(): number {
        return this.instances.length;
    }
    public centroid(): DataInstance {
        const sumArray: number[] = [];
        for (let i = 0; i < this.instances[0].data.length; i++) {
            sumArray.push(0);
        }
        this.instances.forEach(instance => {
            instance.data.forEach((value, index) => {
                sumArray[index] += value;
            });
        });
        const averageArray = sumArray.map(value => value / this.instances.length);
        return { data: averageArray, name: "" };
    }
}
