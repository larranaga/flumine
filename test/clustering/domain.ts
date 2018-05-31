export interface DataInstance{
    data: number[];
    name: string;
}

export interface Cluster {
    instances: DataInstance[];
    size(): number;
    centroid(): DataInstance;
}

export function fromPointsMatrix(dataMatrix: number[][], indexNumber: number): Cluster{
    return new ClusterImp(dataMatrix, indexNumber);
}

export function fromPointsMatrixAndName(dataMatrix: number[][], name: string): Cluster{
    const cluster = new ClusterImp(dataMatrix);
    cluster.instances[0].name = name;
    return cluster;
}

export function reducedClusters(clusters: Cluster[], clusterA: Cluster | null, clusterB: Cluster | null): Cluster[]{
    if(clusterA !== null && clusterB !==null) {
        let newClusters: Cluster[] = [];
        clusters.forEach((cluster) => {
            if(cluster !== clusterA && cluster !== clusterB) {
                newClusters.push(cluster);
            }
        })
    
        newClusters.push(mergedClusters(clusterA, clusterB));
        return newClusters;
    } else {
        return [];
    }
}

export function clusterArrayRep(clusters: Cluster[]) : string {
    return clusters.map(clusterRep).join("\n\n");
}

export function clusterRep(cluster: Cluster): string {
    return "[" + cluster.instances.map(instanceRep).join(", ") + "]";
}

function instanceRep(instance: DataInstance): string {
    //return instance.data.join(", ") + ": " + instance.name;
    return instance.name;
}


export function mergedClusters(clusterA: Cluster, clusterB: Cluster): Cluster {
    const instances = clusterA.instances.concat(clusterB.instances);
    const newCluster = new ClusterImp();
    newCluster.instances = instances;
    return newCluster;
}

class ClusterImp implements Cluster {
    public instances: DataInstance[];

    public constructor(dataMatrix: number[][] = [], indexNumber: number = -1){
        this.instances = [];
        dataMatrix.forEach((dataPoint) => {
            this.instances.push({
                data: dataPoint,
                name: "A" + indexNumber,
            });
        });
    }

    public size() : number{
        return this.instances.length;
    }

    public centroid() : DataInstance{
        const sumArray: number[] = [];
        for(let i = 0 ; i < this.instances[0].data.length ; i++){
            sumArray.push(0);
        }

        this.instances.forEach(instance => {
            instance.data.forEach((value, index) => {
                sumArray[index] += value;
            });
        });
        
        const averageArray = sumArray.map(value => value / this.instances.length);
        return {data: averageArray, name: ""};
    }
}
