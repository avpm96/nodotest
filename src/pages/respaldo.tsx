import React, { useState } from 'react';
import './styles.css';

// Definir la interfaz para el Nodo
interface Nodo {
  id: string;
  vecinos: Nodo[];
  costo: number;
}

// Clase Nodo
class Nodo {
  constructor(
    public id: string,
    public vecinos: Nodo[] = [],
    public costo: number = 0
  ) {}
}

// Componente principal
const Red: React.FC = () => {
  const [visitados, setVisitados] = useState<string[]>([]);
  const [costoTotal, setCostoTotal] = useState<number>(0);

  const recorrerNodo = (nodo: Nodo) => {
    const nuevosVisitados = [...visitados, nodo.id];
    let nuevoCosto = costoTotal;

    nodo.vecinos.forEach(adyacente => {
      if (!nuevosVisitados.includes(adyacente.id)) {
        nuevoCosto += 2 * nodo.costo;
      }
    });

    setVisitados(nuevosVisitados);
    setCostoTotal(nuevoCosto);
  };

  const nodoA = new Nodo('A', [], 1);
  const nodoB = new Nodo('B', [], 2);
  const nodoC = new Nodo('C', [], 3);
  const nodoD = new Nodo('D', [], 4);
  const nodoE = new Nodo('E', [], 5);

  nodoA.vecinos = [nodoB, nodoC];
  nodoB.vecinos = [nodoA, nodoD, nodoC]; // Conexión añadida aquí
  nodoC.vecinos = [nodoA, nodoD, nodoE, nodoB]; // Conexión añadida aquí
  nodoD.vecinos = [nodoB, nodoC];
  nodoE.vecinos = [nodoC];

  return (
    <div>
      <h1>Recorrido de la Red</h1>
      <div className="nodos-container">
        <button className="circular-node" style={{ gridArea: 'nodoA' }} onClick={() => recorrerNodo(nodoA)}>A</button>
        <button className="circular-node" style={{ gridArea: 'nodoB' }} onClick={() => recorrerNodo(nodoB)}>B</button>
        <button className="circular-node" style={{ gridArea: 'nodoC' }} onClick={() => recorrerNodo(nodoC)}>C</button>
        <button className="circular-node" style={{ gridArea: 'nodoD' }} onClick={() => recorrerNodo(nodoD)}>D</button>
        <button className="circular-node" style={{ gridArea: 'nodoE' }} onClick={() => recorrerNodo(nodoE)}>E</button>

        <div className="arista a-b"></div>
        <div className="arista a-c"></div>
        <div className="arista b-c"></div> {/* Arista añadida aquí */}
        <div className="arista b-d"></div> {/* Arista añadida aquí */}
        <div className="arista c-d"></div>
        <div className="arista c-e"></div>
      </div>
      <div>
        <h2>Nodos Visitados: {visitados.join(', ')}</h2>
        <h2>Costo Total: {costoTotal}</h2>
      </div>
    </div>
  );
}

export default Red;
