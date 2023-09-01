import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import { useGiocatori } from "./GiocatoriContext"

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Punteggio() {

    const { giocatori, aggiungiPunteggio, sottraiPunteggio } = useGiocatori()

    const funzione = () => {
        console.log(giocatori);
    }

    const sottrai = (giocatore, punteggioDaDiminuire = 1) => {
        if((giocatore.punteggio - punteggioDaDiminuire)  >= 0){
            sottraiPunteggio(giocatore.id, punteggioDaDiminuire)
        } else {
            toast.error("Impossibile inserire un valore negativo", {
                position: "bottom-center",
              });            
        }
    }

  return (
    <Container>
        <ListGroup style={{textAlign:'center'}}>
            {giocatori.map((giocatore) => (
                <ListGroup.Item key={giocatore.id}>
                <Row style={{maxWidth: '1000px', margin: '0 auto'}}>
                    <Col xs={3}>{giocatore.nome}</Col>
                    <Col xs={3}>{giocatore.punteggio}</Col>
                    <Col>
                        <Row>
                            <Col xs={3}><Button variant="success" onClick={() => aggiungiPunteggio(giocatore.id)}>Add</Button></Col>    
                            <Col xs={3}><Button variant="warning" onClick={() => sottrai(giocatore)}>Subtract</Button></Col>    
                        </Row>
                    </Col>
                </Row>
                </ListGroup.Item>
            ))}
        </ListGroup>
        <ToastContainer />
    </Container>
  )
}

export default Punteggio