import React, { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import "../i18n/i18n";

export default function ConsultarOntologia() {
    const [consulta, setConsulta] = useState("");
    const [resultado, setResultado] = useState(null);
    const { t, i18n } = useTranslation();

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
            return <p>{t("noResults")}</p>;
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
            <h1 className="text-3xl font-bold text-gray-800 mb-6">{t("title")}</h1>
            <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md relative">
                <div className="absolute top-4 right-4 flex items-center space-x-2">
                    <button onClick={() => i18n.changeLanguage("es")} className="w-10 h-10 rounded-full">
                        <img src="src/imagenes/es.png" alt="Español" />
                    </button>
                    <button onClick={() => i18n.changeLanguage("en")} className="w-10 h-10 rounded-full">
                        <img src="src/imagenes/en.png" alt="Inglés" />
                    </button>
                    <button onClick={() => i18n.changeLanguage("fr")} className="w-10 h-10 rounded-full">
                        <img src="src/imagenes/fr.png" alt="Francés" />
                    </button>
                </div>
                <br></br>
                <br></br>
                <textarea
                    value={consulta}
                    onChange={(e) => setConsulta(e.target.value)}
                    placeholder={t("placeholder")}
                    className="w-full h-48 p-3 border border-gray-300 rounded-lg"
                />
                <button
                    onClick={ejecutarConsulta}
                    className="mt-4 w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg"
                >
                    {t("button")}
                </button>

                <div className="mt-6">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">{t("result")}</h2>
                    <div className="bg-gray-100 p-4 rounded-lg border border-gray-200 overflow-auto max-h-96">
                        {renderTabla()}
                    </div>
                </div>
            </div>
        </div>
    );
}
