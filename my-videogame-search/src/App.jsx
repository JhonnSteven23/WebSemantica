// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ConsultarOntologia from './components/ConsultarOntologia';
import Consultar from './Paginas/Consultar';

function App() {
    return (

    <Router>
      <Routes>
        <Route path="/" element={<ConsultarOntologia />} />
        <Route path="Consultar" element={<Consultar/>}/>
      </Routes>
    </Router>

    );
}

export default App;
