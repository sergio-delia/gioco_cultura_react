import Partecipanti from './Partecipanti';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import { GiocatoriProvider } from './GiocatoriContext';
import Partecipanti_manual from './Partecipanti_manual';
import CardGame from './CardGame';
import Play from './Play';


function App() {

  return (
    <Router>
      <GiocatoriProvider numGiocatori={10}>
      <Routes>
        <Route index element={<Navigate to="partecipanti" replace />} />
        <Route path="/partecipanti" element={<Partecipanti />} />
        <Route path="/play" element={<Play />} />
        <Route path="/carte" element={<CardGame />} />
        <Route path="/partecipanti2" element={<Partecipanti_manual />} />
        {/* Altre route */}
      </Routes>
      </GiocatoriProvider>
    </Router>
  );
}

export default App;
