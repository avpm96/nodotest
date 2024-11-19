import { useState, useCallback } from 'react';

type Node = string;
type Edge = { from: Node; to: Node; cost: number };
type PathResult = { path: { node: Node; cost: number }[]; totalCost: number } | null;

export function useGraph(initialEdges: Edge[] = []) {
  const [nodes, setNodes] = useState<Set<Node>>(new Set());
  const [edges, setEdges] = useState<Map<Node, Edge[]>>(new Map());

  // Initialize the graph
  const initializeGraph = useCallback((edgesList: Edge[]) => {
    const newNodes = new Set<Node>();
    const newEdges = new Map<Node, Edge[]>();

    edgesList.forEach(edge => {
      const { from, to, cost } = edge;
      newNodes.add(from);
      newNodes.add(to);

      if (!newEdges.has(from)) newEdges.set(from, []);
      if (!newEdges.has(to)) newEdges.set(to, []);

      newEdges.get(from)!.push({ from, to, cost });
      newEdges.get(to)!.push({ from: to, to: from, cost }); // Grafo no dirigido
    });

    setNodes(newNodes);
    setEdges(newEdges);
  }, []);

  // Add a single edge
  const addEdge = useCallback((edge: Edge) => {
    setNodes(prevNodes => {
      const updatedNodes = new Set(prevNodes);
      updatedNodes.add(edge.from);
      updatedNodes.add(edge.to);
      return updatedNodes;
    });

    setEdges(prevEdges => {
      const updatedEdges = new Map(prevEdges);

      if (!updatedEdges.has(edge.from)) updatedEdges.set(edge.from, []);
      if (!updatedEdges.has(edge.to)) updatedEdges.set(edge.to, []);

      updatedEdges.get(edge.from)!.push(edge);
      updatedEdges.get(edge.to)!.push({ from: edge.to, to: edge.from, cost: edge.cost }); // Grafo no dirigido
      return updatedEdges;
    });
  }, []);

  // Find path and cost
  const findPathAndCost = useCallback(
    (startNode: Node, endNode: Node): PathResult => {
      if (!nodes.has(startNode) || !nodes.has(endNode)) return null;

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
        const adjacentEdges = edges.get(currentNode) || [];

        for (const edge of adjacentEdges) {
          if (!visitedNodes.has(edge.to)) {
            if (dfs(edge.to, [...currentPath, { node: currentNode, cost: currentCost }], currentCost + edge.cost)) {
              return true;
            }
          }
        }

        return false;
      };

      const found = dfs(startNode, [], 0);
      return found ? { path, totalCost } : null;
    },
    [edges, nodes]
  );

  // Initialize the graph with the initialEdges
  initializeGraph(initialEdges);

  return {
    nodes: Array.from(nodes),
    edges,
    addEdge,
    findPathAndCost,
  };
}