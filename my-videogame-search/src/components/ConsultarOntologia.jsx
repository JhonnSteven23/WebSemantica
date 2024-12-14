import React, { useState } from "react";
import axios from "axios";

const ConsultarOntologia = () => {
    const [consulta, setConsulta] = useState("");
    const [resultado, setResultado] = useState(null);

    const ejecutarConsulta = async () => {
        try {
            const response = await axios.post("http://localhost:5000/consultar", { query: consulta });
            setResultado(response.data.results.bindings);
        } catch (error) {
            console.error("Error al consultar:", error);
        }
    };

    return (
        <div>
            <h1>Consultar Ontología</h1>
            <textarea
                value={consulta}
                onChange={(e) => setConsulta(e.target.value)}
                placeholder="Escribe tu consulta SPARQL aquí"
                className="w-full h-48 p-2 border border-gray-300 rounded"
            />
            <button onClick={ejecutarConsulta}>Consultar</button>
            <div>
                <h2>Resultado:</h2>
                <pre>{JSON.stringify(resultado, null, 2)}</pre>
            </div>
        </div>
    );
    
};

export default ConsultarOntologia;