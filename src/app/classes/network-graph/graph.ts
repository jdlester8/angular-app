import { Node } from "./node";

export class Graph {
    
    private adjacencyList: Map<Node, Set<Node>>;

    constructor() {
        this.adjacencyList = new Map();
    }

    addVertex(vertex: Node): void {
        if (!this.adjacencyList.has(vertex)) {
            this.adjacencyList.set(vertex, new Set());
        }
    }

    removeVertex(vertex: Node): boolean {
        if (!this.adjacencyList.has(vertex)) {
            return false;
        }
        this.adjacencyList.forEach((neighbors, currentVertex) => {
            if (neighbors.has(vertex)) {
                neighbors.delete(vertex);
            }
        });
        return this.adjacencyList.delete(vertex);
    }

    addEdge(vertex1: Node, vertex2: Node): void {
        this.addVertex(vertex1);
        this.addVertex(vertex2);
        this.adjacencyList.get(vertex1)?.add(vertex2);
        this.adjacencyList.get(vertex2)?.add(vertex1); // For undirected graph; remove for directed graph
    }

    getNeighbors(vertex: Node): Set<Node> | undefined {
        return this.adjacencyList.get(vertex);
    }

    getAdjacencyList(): Map<Node, Set<Node>> {
        return this.adjacencyList;
    }

    getVertices(): Node[] {
        return Array.from(this.adjacencyList.keys());
    }

    getAdjacencies(): Set<Node>[] {
        return Array.from(this.adjacencyList.values());
    }
}
