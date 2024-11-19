import { useState } from "react";
import "./App.css";
import Red from "./pages/Red";
import { Grafico2,edges2 } from "./pages/prueba";
function App() {

  const nodos = new Grafico2(edges2);

  return (
    <>
      <div>
        <Red/>
        <button
          onClick={() => {
            const result = nodos.findPathAndCost("a", "f");
            console.log("result:", result)
          }}
        >calcular recorrido</button>
      </div>
    </>
  );
}

export default App;
