import React, { useState } from "react";
import axios from "axios";
import locales from "../i18n/locales";

export default function ConsultarOntologia() {
    const [consulta, setConsulta] = useState("");
    const [resultado, setResultado] = useState(null);
    const [idioma, setIdioma] = useState("es"); // Estado del idioma seleccionado

    const ejecutarConsulta = async () => {
        try {
            const response = await axios.post("http://localhost:5000/consultar", { 
                query: consulta,
            });
            setResultado(response.data.results.bindings);
        } catch (error) {
            console.error("Error al consultar:", error);
        }
    };

    const renderTabla = () => {
        if (!resultado || resultado.length === 0) {
            return <p>{locales[idioma].noResults}</p>;
        }

        const columnas = Object.keys(resultado[0]);

        return (
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        {columnas.map((columna) => (
                            <th key={columna} className="border border-gray-300 px-4 py-2 bg-gray-200 text-gray-800">
                                {columna}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {resultado.map((fila, index) => (
                        <tr key={index} className="odd:bg-white even:bg-gray-100">
                            {columnas.map((columna) => (
                                <td key={columna} className="border border-gray-300 px-4 py-2 text-gray-700">
                                    {fila[columna]?.value || ""}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    return (
        <div className="min-h-screen bg-gray-400 flex flex-col items-center p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">{locales[idioma].title}</h1>
            <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md relative">
                <div className="absolute top-4 right-4 flex items-center space-x-2">
                    <button
                        onClick={() => setIdioma("es")}
                        className={`w-10 h-10 rounded-full border-2 ${idioma === "es" ? "border-blue-500" : "border-gray-300"}`}
                    >
                        <img src="src/imagenes/es.png" alt="Español" className="w-full h-full rounded-full" />
                    </button>
                    <button
                        onClick={() => setIdioma("en")}
                        className={`w-10 h-10 rounded-full border-2 ${idioma === "en" ? "border-blue-500" : "border-gray-300"}`}
                    >
                        <img src="src/imagenes/en.png" alt="Inglés" className="w-full h-full rounded-full" />
                    </button>
                    <button
                        onClick={() => setIdioma("fr")}
                        className={`w-10 h-10 rounded-full border-2 ${idioma === "fr" ? "border-blue-500" : "border-gray-300"}`}
                    >
                        <img src="src/imagenes/fr.png" alt="Francés" className="w-full h-full rounded-full" />
                    </button>
                    
                </div>
                <br></br>
                <br></br>
                <p className="text-gray-700 mb-4">{locales[idioma].description}</p>

                <div className="mt-4">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{locales[idioma].examples}</h3>
                    <ul className="list-disc list-inside text-gray-700">
                        <li
                            onClick={() => setConsulta("SELECT ?s ?p ?o WHERE { ?s ?p ?o } LIMIT 10")}
                            className="cursor-pointer hover:underline"
                        >
                            {locales[idioma].example1}
                        </li>
                        <li
                            onClick={() => setConsulta("SELECT ?persona ?edad WHERE { ?persona :tieneEdad ?edad }")}
                            className="cursor-pointer hover:underline"
                        >
                            {locales[idioma].example2}
                        </li>
                        <li
                            onClick={() => setConsulta("SELECT ?clase WHERE { ?clase a owl:Class }")}
                            className="cursor-pointer hover:underline"
                        >
                            {locales[idioma].example3}
                        </li>
                    </ul>
                </div>
                <br></br>

                <textarea
                    value={consulta}
                    onChange={(e) => setConsulta(e.target.value)}
                    placeholder={locales[idioma].placeholder}
                    className="w-full h-48 p-3 border border-gray-300 rounded-lg"
                />
                <button
                    onClick={ejecutarConsulta}
                    className="mt-4 w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg"
                >
                    {locales[idioma].button}
                </button>

                <div className="mt-6">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">{locales[idioma].result}</h2>
                    <div className="bg-gray-100 p-4 rounded-lg border border-gray-200 overflow-auto max-h-96">
                        {renderTabla()}
                    </div>
                </div>
            </div>
        </div>
    );
}
