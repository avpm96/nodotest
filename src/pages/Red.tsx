import React, { useState } from "react";
import { Grafico2, edges2, Edge } from "../utils/findPathCost"; // Ruta corregida
import GraphComponent from "../components/GraphComponent"; // Ruta relativa al nuevo componente
import "./styles.css";

interface Node {
  id: string;
}

interface Result {
  path: { node: string; cost: number }[];
  totalCost: number;
}

const getUniqueNodes = (edges2: Edge[]): Node[] => {
  const nodesSet = new Set<string>();
  edges2.forEach((edge2) => {
    nodesSet.add(edge2.source);
    nodesSet.add(edge2.target);
  });
  return Array.from(nodesSet).map((node) => ({ id: node }));
};

const nodes: Node[] = getUniqueNodes(edges2);
const calculate = new Grafico2(edges2);

const Red = () => {
  const [startNode, setStartNode] = useState("a");
  const [endNode, setEndNode] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  return (
    <div className="container">
      <div>
        <h1 className="text">Recorrido de Red</h1>
      </div>
      <div className="select-container">
        <label htmlFor="startNode" className="label text">
          Selecciona el nodo inicial:
        </label>
        <select
          id="startNode"
          value={startNode}
          onChange={(e) => setStartNode(e.target.value)}
          className="select"
        >
          {nodes.map((node, index) => (
            <option key={index} value={node.id}>
              {node.id}
            </option>
          ))}
        </select>
      </div>
      <div className="select-container">
        <label htmlFor="endNode" className="label text">
          Selecciona el nodo final:
        </label>
        <select
          id="endNode"
          value={endNode}
          onChange={(e) => setEndNode(e.target.value)}
          className="select"
        >
          {nodes.map((node, index) => (
            <option key={index} value={node.id}>
              {node.id}
            </option>
          ))}
        </select>
      </div>
      <div className="button-container">
        <button
          onClick={() => {
            const result = calculate.findPathAndCost(startNode, endNode);
            setResult(result);
          }}
          className="button button-shadow"
        >
          Calcular recorrido
        </button>
      </div>
      {result && (
        <div className="text">
          <h3>Camino encontrado:</h3>
          <ul>
            {result.path.map((p, index) => (
              <li key={index}>
                {p.node} - Costo parcial: {p.cost}
              </li>
            ))}
          </ul>
          <p>Costo total: {result.totalCost}</p>
        </div>
      )}

      <GraphComponent nodes={nodes} edges={edges2} />
    </div>
  );
};

export default Red;
