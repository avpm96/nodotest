type Node = string;
type Edge = { source: Node; target: Node; cost: number };

export class Graph {
  nodes: Set<Node>;
  edges: Map<Node, Edge[]>;

  constructor(edges: Edge[]) {
    this.nodes = new Set();
    this.edges = new Map();

    edges.forEach((edge) => {
      const { source, target, cost } = edge;
      this.nodes.add(source);
      this.nodes.add(target);

      if (!this.edges.has(source)) this.edges.set(source, []);
      if (!this.edges.has(target)) this.edges.set(target, []);

      this.edges.get(source)!.push({ source, target, cost });
      this.edges.get(target)!.push({ source: target, target: source, cost }); // Grafo no dirigido
    });
  }

  findPathAndCost(
    startNode: Node,
    endNode: Node
  ): { path: Node[]; cost: number } | null {
    const visitedNodes = new Set<Node>();
    let path: Node[] = [];
    let totalCost = 0;

    const dfs = (
      currentNode: Node,
      currentPath: Node[],
      currentCost: number
    ): boolean => {
      if (currentNode === endNode) {
        // Si llegamos al nodo destino, guardamos el resultado
        path = [...currentPath, currentNode];
        totalCost = currentCost;
        return true;
      }

      visitedNodes.add(currentNode);
      const adjacentEdges = this.edges.get(currentNode) || [];

      for (const edge of adjacentEdges) {
        if (!visitedNodes.has(edge.target)) {
          // Realiza búsqueda recursiva
          if (
            dfs(edge.target, [...currentPath, currentNode], currentCost + edge.cost)
          ) {
            return true; // Detener la búsqueda al encontrar el destino
          }
        }
      }

      return false; // No se encontró el camino en esta rama
    };

    const found = dfs(startNode, [], 0);
    return found ? { path, cost: totalCost } : null; // Devuelve el resultado o null si no hay camino
  }
}

// Ejemplo de uso
export const edges: Edge[] = [
  { source: "a", target: "b", cost: 1 },
  { source: "a", target: "c", cost: 2 },
  { source: "a", target: "d", cost: 3 },
  { source: "b", target: "c", cost: 1 },
  { source: "b", target: "d", cost: 4 },
  { source: "b", target: "e", cost: 5 },
  { source: "d", target: "e", cost: 2 },
  { source: "e", target: "f", cost: 3 },
];

const graph = new Graph(edges);
const result = graph.findPathAndCost("a", "f");

if (result) {
  console.log("Camino encontrado:", `${result.path.join(" -> ")}`);
  console.log("Costo total", `${result.cost}`);
} else {
  console.log("No existe un camino entre los nodos especificados.");
}
