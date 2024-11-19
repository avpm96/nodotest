import React from "react";
import ForceGraph2D, { NodeObject, LinkObject } from "react-force-graph-2d";
import { Edge } from "../../utils/findPathCost"

interface Node {
  id: string;
}

interface Node2 extends NodeObject {
  id: string;
  x: number;
  y: number;
}

interface Link extends LinkObject {
  source: Node2;
  target: Node2;
  cost?: string;
}

interface GraphComponentProps {
  nodes: Node[];
  edges: Edge[];
}

const GraphComponent: React.FC<GraphComponentProps> = ({ nodes, edges }) => {
  return (
    <ForceGraph2D
      linkCanvasObject={(link: Link, ctx) => {
        ctx.beginPath();
        ctx.moveTo(link.source.x, link.source.y);
        ctx.lineTo(link.target.x, link.target.y);
        ctx.strokeStyle = "rgba(0,0,0,0.5)";
        ctx.lineWidth = 1;
        ctx.stroke();
        const cost = link.cost;
        if (cost) {
          const midX = (link.source.x + link.target.x) / 2;
          const midY = (link.source.y + link.target.y) / 2;
          const fontSize = 10;
          ctx.font = `${fontSize}px Arial`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = "red";
          ctx.fillText(cost, midX, midY);
        }
      }}
      nodeCanvasObject={(node: Node2, ctx) => {
        const label = node.id;
        const fontSize = 12;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 5, 0, 2 * Math.PI, false);
        ctx.fillStyle = "#da70d6";
        ctx.fill();
        ctx.closePath();
        ctx.font = `${fontSize}px Arial`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "black";
        ctx.fillText(label, node.x, node.y - 10);
      }}
      nodePointerAreaPaint={(node: Node2, color, ctx) => {
        const fontSize = 12;
        ctx.font = `${fontSize}px Arial`;
        const textWidth = ctx.measureText(node.id).width;
        const textHeight = fontSize;
        ctx.fillStyle = color;
        ctx.fillRect(
          node.x - textWidth / 2,
          node.y - textHeight - 10,
          textWidth,
          textHeight
        );
      }}
      graphData={{ nodes: nodes, links: edges }}
      nodeLabel="id"
      linkDirectionalArrowLength={6}
      linkDirectionalArrowRelPos={1}
    />
  );
};

export default GraphComponent;
