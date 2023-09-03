import { useEffect, useRef, useState } from "react";
import { useGiocatori } from "./GiocatoriContext";
import { useNavigate } from "react-router-dom";
import Punteggio from "./Punteggio";
import { sport } from "./domande/sport";
import { Button, Col, Container, ProgressBar, Row, Spinner } from "react-bootstrap";
import FlippingCard from "./FlippingCard";
import { cinema } from "./domande/cinema";
import { arte } from "./domande/arte";
import { storia } from "./domande/storia";
import AllAnswerModal from "./AllAnswerModal";


function Play() {
  const { giocatori } = useGiocatori();
  const navigate = useNavigate();

  const [listaDomande2, setlistaDomande2] = useState({
    sport:{},
    cinema:{},
    arte:{},
    storia:{}
  })

  const [domandeModal, setDomandeModal] = useState([])
  const [listaDomande, setlistaDomande] = useState([])

  const [flipAll, setFlipAll] = useState(false)

  useEffect(() => {
    if (giocatori.length < 2) {
      navigate("/partecipanti");
    }
  }, []);

  
  const avviaGioco = () => {
    setlistaDomande([sport[[Math.floor(Math.random() * sport.length)]]])
  };




  const avviaGioco2 = () => {
    toggleFlipAll()
    setlistaDomande2({
        sport:sport[[Math.floor(Math.random() * sport.length)]],
        cinema: cinema[[Math.floor(Math.random() * cinema.length)]],
        arte: arte[[Math.floor(Math.random() * arte.length)]],
        storia: storia[[Math.floor(Math.random() * storia.length)]],
    })
    stopProgressBar()
    setDomandeModal([])
   
  };

  

  const toggleFlipAll = () => {
    setFlipAll(!flipAll)
  }

 
  
/* PROGRESS BAR ------------------------------------------------------------------------------------------------------------------- */

const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const keysRef = useRef(Object.keys(listaDomande2));
  const [numDomandeRimanenti, setNumDomandeRimanenti] = useState(Object.keys(listaDomande2).length);


  const startProgressBar = () => {
    stopProgressBar()
    setNumDomandeRimanenti(Object.keys(listaDomande2).length)
    setIsRunning(true);
    
    keysRef.current = Object.keys(listaDomande2);
    const updatedListaDomande = { ...listaDomande2 };

    
    const newIntervalId = setInterval(() => {

      setProgress((prevProgress) => {
        const keys = keysRef.current;
        // if (!isRunning) {
        //   clearInterval(newIntervalId); // Ferma l'intervallo se non è più in esecuzione
        //   return prevProgress;
        // }
        if (prevProgress < 100) {
          return prevProgress + 10; // Aumenta di 10 ogni 10 secondi
        } else if (keys.length > 1) {
          console.log(keys);
          const randomKey = keys[Math.floor(Math.random() * keys.length)];
          console.log(randomKey);
          console.log(updatedListaDomande);
          const updatedDomande = { ...updatedListaDomande };
          setDomandeModal((oldArray) => [
            ...oldArray,
            {
              id: oldArray.length,
              domanda: updatedDomande[randomKey].domanda,
              risposta: updatedDomande[randomKey].risposta
            }
          ]);
          delete updatedListaDomande[randomKey];
          setlistaDomande2(updatedListaDomande);
          var ind = keys.indexOf(randomKey); 
          keys.splice(ind, 1);

          return 0;
        } else {
          setNumDomandeRimanenti(Object.keys(updatedListaDomande).length); // Aggiorna il numero di domande rimanenti
          if (numDomandeRimanenti > 1) {
            return 100; // Riavvia la progress bar dopo aver raggiunto il 100%
          } else {
            setIsRunning(false); // Ferma la progress bar
            return 100;
          }
        }
      });
    }, 1000);
  
    setIntervalId(newIntervalId);
  };

  useEffect(() => {
    console.log(domandeModal);
  }, [domandeModal])
  


  useEffect(() => {
    console.log(listaDomande2);
  
  }, [listaDomande2])
  

  const stopProgressBar = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }

    setIsRunning(false);
    setProgress(0);
  };

 
  

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);




  return (
    <>
      <Container>
        <Punteggio />


        <div className="d-grid gap-2">
        <Button className="mb-3 mt-5" onClick={avviaGioco2} size="lg">Nuove domande2</Button>
        </div>


        {listaDomande2 ? 
        <Row>
        <Col className="mb-3" xs={6} sm={6} md={3}><FlippingCard flipAll={flipAll} frontContent={listaDomande2.sport ? listaDomande2.sport.domanda: ''} backContent={listaDomande2.sport ? listaDomande2.sport.risposta : ''} /></Col>
        <Col className="mb-3" xs={6} sm={6} md={3}><FlippingCard flipAll={flipAll} frontContent={listaDomande2.arte ? listaDomande2.arte.domanda : ''} backContent={listaDomande2.arte ? listaDomande2.arte.risposta : ''} /></Col>
        <Col className="mb-3" xs={6} sm={6} md={3}><FlippingCard flipAll={flipAll} frontContent={listaDomande2.cinema ? listaDomande2.cinema.domanda : ''} backContent={listaDomande2.cinema ? listaDomande2.cinema.risposta : '' } /></Col>
        <Col className="mb-3" xs={6} sm={6} md={3}><FlippingCard flipAll={flipAll} frontContent={listaDomande2.storia ? listaDomande2.storia.domanda : ''} backContent={listaDomande2.storia ? listaDomande2.storia.risposta : ''} /></Col>
        </Row>
        : <Col></Col>
        }
        <ProgressBar now={progress} label={`${progress}%`} />
        <Button onClick={startProgressBar}>
        Start
      </Button>
      <Button onClick={stopProgressBar} disabled={!isRunning}>
        Ferma
      </Button>

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
        
        <AllAnswerModal domandeModal={domandeModal} />
      </Container>
    </>
  );
}

export default Play;
