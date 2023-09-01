import React, { createContext, useContext, useState } from 'react';

// Crea un nuovo contesto
const GiocatoriContext = createContext();

// Crea un componente Provider per il contesto
export function GiocatoriProvider({ children, numGiocatori }) {
  
  const [giocatori, setGiocatori] = useState([]);

  // Funzione per aggiungere un giocatore
  const aggiungiGiocatore = (nome, punteggio) => {
    const found = giocatori.some(giocatore => giocatore.nome == nome);
    if(found){
      return false;
    }
    setGiocatori([...giocatori, {id: giocatori.length , nome, punteggio }]);
    return true;
  };

  const aggiungiPunteggio = (id, punteggioDaAumentare = 1) => {
    const updatedPlayers = giocatori.map((player) =>
    player.id === id ? { ...player, punteggio: player.punteggio + punteggioDaAumentare } : player
  );
  setGiocatori(updatedPlayers);
  }

  const sottraiPunteggio = (id, punteggioDaDiminuire = 1) => {
    const updatedPlayers = giocatori.map((player) =>
    player.id === id ? { ...player, punteggio: player.punteggio - punteggioDaDiminuire } : player
  );
  setGiocatori(updatedPlayers);
  }


  return (
    <GiocatoriContext.Provider value={{ giocatori, aggiungiGiocatore, aggiungiPunteggio, sottraiPunteggio }}>
      {children}
    </GiocatoriContext.Provider>
  );
}

// Hook personalizzato per accedere ai dati dei giocatori
export function useGiocatori() {
  return useContext(GiocatoriContext);
}