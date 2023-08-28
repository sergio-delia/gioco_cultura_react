import React, { useState } from 'react';
import { GiocatoriProvider, useGiocatori } from './GiocatoriContext';

function Partecipanti() {
  const [nome, setNome] = useState('');
  const [punteggio, setPunteggio] = useState(0);
  const { giocatori, aggiungiGiocatore } = useGiocatori();

  const handleAggiungiGiocatore = () => {
    if (nome.trim() !== '') {
      aggiungiGiocatore(nome, punteggio);
      setNome('');
      setPunteggio(0);
    }
  };

  return (
    <div>
      <h1>Partecipanti</h1>
      <input
        type="text"
        placeholder="Nome del giocatore"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <input
        type="number"
        placeholder="Punteggio"
        value={punteggio}
        onChange={(e) => setPunteggio(Number(e.target.value))}
      />
      <button onClick={handleAggiungiGiocatore}>Aggiungi Giocatore</button>
      
      <h2>Lista dei Giocatori:</h2>
      <ul>
        {giocatori.map((giocatore, index) => (
          <li key={index}>
            {giocatore.nome} - Punteggio: {giocatore.punteggio}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Partecipanti;