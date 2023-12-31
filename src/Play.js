import { useEffect, useRef, useState } from "react";
import { useGiocatori } from "./GiocatoriContext";
import { useNavigate } from "react-router-dom";
import Punteggio from "./Punteggio";
import { sport } from "./domande/sport";
import { Accordion, Button, Col, Container, ProgressBar, Row } from "react-bootstrap";
import FlippingCard from "./FlippingCard";
import { cinema } from "./domande/cinema";
import { arte } from "./domande/arte";
import { storia } from "./domande/storia";
import {geografia} from "./domande/geografia"
import {cultura} from "./domande/cultura"
import {scienze} from "./domande/scienza"
import {serietv} from "./domande/serietv"
import AllAnswerModal from "./AllAnswerModal";
import Categorie from "./Categorie";
import { toast } from "react-toastify";


function Play() {

  const { giocatori } = useGiocatori();
  const navigate = useNavigate();

  const [listaDomande2, setlistaDomande2] = useState({

  })

  const [domandeModal, setDomandeModal] = useState([])

  const [flipAll, setFlipAll] = useState(false)

  useEffect(() => {
    console.log(numDomandeRimanenti);
    if (giocatori.length < 2) {
      navigate("/partecipanti");
    }
  }, []);



const popolaDomande = (categoria) => {


    switch(categoria){
      case 'storia':
        return storia[Math.floor(Math.random() * storia.length)];
      case 'arte':
        return arte[Math.floor(Math.random() * arte.length)];
      case 'cinema':
        return cinema[Math.floor(Math.random() * cinema.length)];
      case 'sport':
        return sport[Math.floor(Math.random() * sport.length)];
      case 'cultura':
        return cultura[Math.floor(Math.random() * cultura.length)];
      case 'geografia':
        return geografia[Math.floor(Math.random() * geografia.length)];
      case 'scienze':
        return scienze[Math.floor(Math.random() * scienze.length)];
      case 'serietv':
        return serietv[Math.floor(Math.random() * serietv.length)];
      default:
        return null; 
    }


}


  const avviaGioco2 = () => {
    toggleFlipAll()

    const categorieAttive = Object.keys(categorie).filter((categoria) => categorie[categoria] === true);
    
    if(categorieAttive.length != 4){
      toast.error("Seleziona 4 categorie per iniziare il gioco", {
        position: "bottom-center",
      });            
      return;
    }

    const domandeAttive = {}
      categorieAttive.map((categoria) => {
        domandeAttive[categoria] = popolaDomande(categoria)
      })

      setlistaDomande2(domandeAttive)
     /* console.log(domandeAttive);
      return;

    setlistaDomande2({
      sport:sport[[Math.floor(Math.random() * sport.length)]],
      cinema: cinema[[Math.floor(Math.random() * cinema.length)]],
      arte: arte[[Math.floor(Math.random() * arte.length)]],
      storia: storia[[Math.floor(Math.random() * storia.length)]],
    }) */
    
    stopProgressBar()
    setDomandeModal([])
   
  };

  useEffect(() => {
    setNumDomandeRimanenti(Object.keys(listaDomande2).length)
  }, [listaDomande2])
  

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
        if (prevProgress < 10) {
          return prevProgress + 1; // Aumenta di 10 ogni 10 secondi
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
            return 10; // Riavvia la progress bar dopo aver raggiunto il 100%
          } else {
            setIsRunning(false); // Ferma la progress bar
            return 10;
          }
        }
      });
    }, 1000);
  
    setIntervalId(newIntervalId);
  };
  

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


/* MODAL ------------------------------------------------------------------------ */


const [show, setShow] = useState(false);

useEffect(() => {
  if(show){
    stopProgressBar();
  }

}, [show])




/* CATEGORIE ---------------------------------------------------------------------- */

const [categorie, setCategorie] = useState({
  storia: true,
  cinema: true,
  arte: true,
  sport: true,
  geografia: false,
  serietv: false,
  scienze: false,
  cultura: false,
});

  return (
    <>
      <Container className="mb-3 mt-3">


      <Row>
        <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Seleziona categorie</Accordion.Header>
        <Accordion.Collapse eventKey="0">
          <Accordion.Body>
            <Categorie categorie={categorie} setCategorie={setCategorie} />
          </Accordion.Body>
        </Accordion.Collapse>
        </Accordion.Item>
      </Accordion>
    </Row>
        {/* <Categorie categorie={categorie} setCategorie={setCategorie} /> */}
        <Punteggio />

        <div className="d-grid gap-2">
        <Button className="mb-3 mt-5" variant="success" onClick={avviaGioco2} size="lg">Nuove domande</Button>
        </div>

        {listaDomande2 ? 
        <Row className="justify-content-center">
        {Object.keys(listaDomande2).map(domanda => 
          <Col className="mb-3" xs={6} sm={6} md={3}><FlippingCard flipAll={flipAll} frontContent={listaDomande2[domanda].domanda ? listaDomande2[domanda].domanda: ''} backContent={listaDomande2[domanda].risposta ? listaDomande2[domanda].risposta : ''} /></Col>
          )}
        
        
        {/* <Col className="mb-3" xs={6} sm={6} md={3}><FlippingCard flipAll={flipAll} frontContent={listaDomande2.sport ? listaDomande2.sport.domanda: ''} backContent={listaDomande2.sport ? listaDomande2.sport.risposta : ''} /></Col>
        <Col className="mb-3" xs={6} sm={6} md={3}><FlippingCard flipAll={flipAll} frontContent={listaDomande2.arte ? listaDomande2.arte.domanda : ''} backContent={listaDomande2.arte ? listaDomande2.arte.risposta : ''} /></Col>
        <Col className="mb-3" xs={6} sm={6} md={3}><FlippingCard flipAll={flipAll} frontContent={listaDomande2.cinema ? listaDomande2.cinema.domanda : ''} backContent={listaDomande2.cinema ? listaDomande2.cinema.risposta : '' } /></Col>
        <Col className="mb-3" xs={6} sm={6} md={3}><FlippingCard flipAll={flipAll} frontContent={listaDomande2.storia ? listaDomande2.storia.domanda : ''} backContent={listaDomande2.storia ? listaDomande2.storia.risposta : ''} /></Col>
         */}
        
        </Row>
        : <Col></Col>
        }
        <ProgressBar max={10} now={progress} label={`${progress}`} />
      <div style={{textAlign:'center'}}>
      <Button disabled={numDomandeRimanenti < 2 || isRunning} variant="primary" className="mt-3 mb-3 me-1" onClick={startProgressBar}>
        Start
      </Button>
      <Button variant="danger" className="mt-3 mb-3 ms-1" onClick={stopProgressBar} disabled={!isRunning}>
        Ferma
      </Button>
        
        <AllAnswerModal show={show} setShow={setShow} domandeModal={domandeModal} />
        </div>  
      </Container>
    </>
  );
}

export default Play;
