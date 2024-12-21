import React, { useState } from "react";
import axios from "axios";

export default function Consultar() {
    
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
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Consultar Ontología</h1>
            <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
                <textarea
                    value={consulta}
                    onChange={(e) => setConsulta(e.target.value)}
                    placeholder="Escribe tu consulta SPARQL aquí"
                    className="w-full h-48 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={ejecutarConsulta}
                    className="mt-4 w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    Consultar
                </button>
                <div className="mt-6">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Resultado:</h2>
                    <div className="bg-gray-100 p-4 rounded-lg border border-gray-200 overflow-auto max-h-96">
                        <pre className="text-sm text-gray-800">
                            {resultado ? JSON.stringify(resultado, null, 2) : "No hay resultados aún."}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
}

