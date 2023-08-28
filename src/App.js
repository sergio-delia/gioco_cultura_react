import Partecipanti from './Partecipanti';
import Partecipanti2 from './Partecipanti_manual';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { GiocatoriProvider } from './GiocatoriContext';


function App() {
  return (
    <Router>
      <GiocatoriProvider numGiocatori={10}>
      <Routes>
        <Route path="/partecipanti" element={<Partecipanti />} />
        <Route path="/partecipanti2" element={<Partecipanti2 />} />
        {/* Altre route */}
      </Routes>
      </GiocatoriProvider>
    </Router>
  );
}

export default App;
