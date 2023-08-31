import React, { useState } from "react";
import { GiocatoriProvider, useGiocatori } from "./GiocatoriContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Partecipanti() {

  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [punteggio, setPunteggio] = useState(0);

  const { giocatori, aggiungiGiocatore } = useGiocatori();

  const handleAggiungiGiocatore = () => {
    if (nome.trim() !== "") {
      let giocatore_aggiunto = aggiungiGiocatore(nome, punteggio);
      if (!giocatore_aggiunto) {
        toast.error("Impossibile aggiungere 2 giocatori con lo stesso nome", {
          position: "bottom-center",
        });
      }
      setNome("");
      setPunteggio(0);
    }
    console.log(giocatori.length);
  };


  const navigateToStart = () => {
    navigate('/play')
  }

  return (
    <div>
      <h1>Partecipanti</h1>
      <input
        type="text"
        placeholder="Nome del giocatore"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
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
      <button disabled={giocatori.length < 2} onClick={navigateToStart}>Avvia gioco</button>
      <ToastContainer />
    </div>
  );
}

export default Partecipanti;
