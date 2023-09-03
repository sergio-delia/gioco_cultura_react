import React, { useState } from "react";
import { GiocatoriProvider, useGiocatori } from "./GiocatoriContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Button, Container, FloatingLabel, Form, ListGroup } from "react-bootstrap";

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
  };

  const handleFormSubmit = (e) => {
    e.preventDefault()
    handleAggiungiGiocatore()
  }

  const navigateToStart = () => {
    navigate('/play')
  }

  return (
    <Container>
      <h1 className="mb-3 mt-3">Partecipanti</h1>
      <Form onSubmit={(e) => handleFormSubmit(e)}>

      <FloatingLabel
        controlId="floatingInput"
        label="Aggiungi giocatore"
        className="mb-3"
        >
        <Form.Control type="text" placeholder="Sergio" value={nome}
        onChange={(e) => setNome(e.target.value)} />
      </FloatingLabel>
 
      <Button type="submit" className="mb-5" onClick={handleAggiungiGiocatore}>Aggiungi Giocatore</Button>
      </Form>

      <h2 className="mb-3 mb-3">Lista dei Giocatori:</h2>
      <ListGroup className="mb-3" style={{textAlign:'center'}}>
        {giocatori.map((giocatore, index) => (
          <ListGroup.Item key={index}>
            {giocatore.nome} - Punteggio: {giocatore.punteggio}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Button disabled={giocatori.length < 2} onClick={navigateToStart}>Avvia gioco</Button>
      <ToastContainer />
    </Container>
  );
}

export default Partecipanti;
