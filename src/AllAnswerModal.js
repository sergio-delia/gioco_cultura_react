import React, { useState } from 'react'
import { Badge, Button, Container, ListGroup, Modal, Row } from 'react-bootstrap'

function AllAnswerModal({domandeModal}) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        console.log(domandeModal);
        setShow(true)};


  return (
    <>
    <Container>

      <Row>

          <Button style={{width:'auto'}} disabled={domandeModal.length < 1} variant="secondary" onClick={handleShow}>
        Scopri le risposte delle domande sparite
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>E vedi di imparare qualcosa!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
        <ListGroup as="ol" numbered>

        {domandeModal.map(domanda => 
        
        <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start" key={domanda.id}
        >
        <div className="ms-2 me-auto">
          <div className="fw-bold">{domanda.domanda}</div>
          {domanda.risposta}
        </div>
      </ListGroup.Item>
        )}
      </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Chiudi
          </Button>
        </Modal.Footer>
      </Modal>
        </Row>
        </Container>
    </>
  )
}

export default AllAnswerModal