
type Node = string;
export type Edge = { source: Node; target: Node; cost: number };

export class Grafico2 {
  nodes: Set<Node>;
  edges: Map<Node, Edge[]>;

  constructor(edges: Edge[]) {
    this.nodes = new Set();
    this.edges = new Map();

    edges.forEach(edge => {
      const { source, target, cost } = edge;
      this.nodes.add(source);
      this.nodes.add(target);

      if (!this.edges.has(source)) this.edges.set(source, []);
     

      this.edges.get(source)!.push({ source, target, cost });
      
    });
  }

  findPathAndCost(startNode: Node, endNode: Node): { path: { node: Node; cost: number }[]; totalCost: number } | null {
    const visitedNodes = new Set<Node>();
    let path: { node: Node; cost: number }[] = [];
    let totalCost = 0;

    const dfs = (currentNode: Node, currentPath: { node: Node; cost: number }[], currentCost: number): boolean => {
      if (currentNode === endNode) {

        path = [...currentPath, { node: currentNode, cost: currentCost }];
        totalCost = currentCost;
        return true;
      }

      visitedNodes.add(currentNode);
      const adjacentEdges = this.edges.get(currentNode) || [];

      for (const edge of adjacentEdges) {
        if (!visitedNodes.has(edge.target)) {
      
          if (dfs(edge.target, [...currentPath, { node: currentNode, cost: currentCost }], currentCost + edge.cost)) {
            return true; 
          }
        }
      }

      return false; 
    };

    const found = dfs(startNode, [], 0);
    return found ? { path, totalCost } : null; 
  }
}


export const edges2: Edge[] = [
  { source: 'a', target: 'b', cost: 1 },
  { source: 'a', target: 'c', cost: 2 },
  { source: 'a', target: 'd', cost: 3 },
  { source: 'b', target: 'c', cost: 1 },
  { source: 'b', target: 'd', cost: 4 },
  { source: 'b', target: 'e', cost: 5 },
  { source: 'd', target: 'e', cost: 2 },
  { source: 'e', target: 'f', cost: 3 }
];



