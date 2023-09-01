import { useEffect, useState } from "react";
import { useGiocatori } from "./GiocatoriContext";
import { useNavigate } from "react-router-dom";
import Punteggio from "./Punteggio";
import { sport } from "./domande/sport";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import FlippingCard from "./FlippingCard";
import { cinema } from "./domande/cinema";
import { arte } from "./domande/arte";
import { storia } from "./domande/storia";

function Play() {
  const { giocatori } = useGiocatori();
  const navigate = useNavigate();

  const [carteSelezionate, setCarteSelezionate] = useState({
    geografia: false,
    cinema: false,
    sport: false,
    storia: false,
    arte: false,
  });

  useEffect(() => {
    if (giocatori.length < 2) {
      navigate("/partecipanti");
    }
  }, []);

  const [listaDomande, setlistaDomande] = useState([])
  const avviaGioco = () => {
    setlistaDomande([sport[[Math.floor(Math.random() * sport.length)]]])
  };

  const [listaDomande2, setlistaDomande2] = useState({
    sport:{},
    cinema:{},
    arte:{},
    storia:{}
  })


  const avviaGioco2 = () => {
    toggleFlipAll()
    setlistaDomande2({
        sport:sport[[Math.floor(Math.random() * sport.length)]],
        cinema: cinema[[Math.floor(Math.random() * cinema.length)]],
        arte: arte[[Math.floor(Math.random() * arte.length)]],
        storia: storia[[Math.floor(Math.random() * storia.length)]],
    })


  };

  const [flipAll, setFlipAll] = useState(false)

  const toggleFlipAll = () => {
    setFlipAll(!flipAll)
  }

  return (
    <>
      <Container>
        <Punteggio />


        <div className="d-grid gap-2">
        <Button onClick={avviaGioco2} size="lg">Nuove domande2</Button>
        </div>


        {listaDomande2 ? 
        <Row>
        <Col><FlippingCard flipAll={flipAll} frontContent={listaDomande2.sport.domanda} backContent={listaDomande2.sport.risposta} /></Col>
        <Col><FlippingCard flipAll={flipAll} frontContent={listaDomande2.arte.domanda} backContent={listaDomande2.arte.risposta} /></Col>
        <Col><FlippingCard flipAll={flipAll} frontContent={listaDomande2.cinema.domanda} backContent={listaDomande2.cinema.risposta} /></Col>
        <Col><FlippingCard flipAll={flipAll} frontContent={listaDomande2.storia.domanda} backContent={listaDomande2.storia.risposta} /></Col>
        </Row>
        : <Col></Col>
        }
        


        <div className="d-grid gap-2">
        <Button onClick={avviaGioco} size="lg">Nuove domande</Button>
        </div>
        <Row>
        {listaDomande ? 
            listaDomande.map(domanda => 
                <Col>
            <FlippingCard
              frontContent={domanda.domanda}
              backContent={domanda.risposta}
            />                
                </Col>
                )
            
                    : 
            <Col></Col>
        }
        </Row>

        <Row>
          <Col sm={6} md={3}>
            <FlippingCard
              frontContent="Front of Card 1"
              backContent="Back of Card 1"
            />
          </Col>
          <Col sm={6} md={3}>
            <FlippingCard
              frontContent="Front of Card 1"
              backContent="Back of Card 1"
            />
          </Col>
          <Col sm={6} md={3}>
            <FlippingCard
              frontContent="Front of Card 2"
              backContent="Back of Card 2"
            />
          </Col>
          <Col sm={6} md={3}>
            <FlippingCard
              frontContent="Front of Card 2"
              backContent="Back of Card 2"
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Play;
