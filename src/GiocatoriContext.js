import React, { createContext, useContext, useState } from 'react';

// Crea un nuovo contesto
const GiocatoriContext = createContext();

// Crea un componente Provider per il contesto
export function GiocatoriProvider({ children, numGiocatori }) {
  const [giocatori, setGiocatori] = useState([]);

  // Funzione per aggiungere un giocatore
  const aggiungiGiocatore = (nome, punteggio) => {
    setGiocatori([...giocatori, { nome, punteggio }]);
  };

  // Altri metodi per aggiornare i dati dei giocatori, se necessario

  return (
    <GiocatoriContext.Provider value={{ giocatori, aggiungiGiocatore }}>
      {children}
    </GiocatoriContext.Provider>
  );
}

// Hook personalizzato per accedere ai dati dei giocatori
export function useGiocatori() {
  return useContext(GiocatoriContext);
}