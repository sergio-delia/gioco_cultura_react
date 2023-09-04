import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaRegSquareCheck, FaRegSquareFull } from "react-icons/fa6";

function Categorie({categorie, setCategorie}) {


  const handleScegliCategoria = (categoria) => {
    const nuoveCategorie = { ...categorie };
    if (nuoveCategorie[categoria] === true) {
      nuoveCategorie[categoria] = false;
      setCategorie(nuoveCategorie);
    } else {
      const numeroCategorieAttive = Object.values(categorie).filter(
        (value) => value === true
      ).length;
      if (numeroCategorieAttive < 4) {
        nuoveCategorie[categoria] = true;
        setCategorie(nuoveCategorie);
      } else {
        toast.error("Non puoi selezionare più di 4 categorie", {
          position: "bottom-center",
        });
      }
    }
  };

  useEffect(() => {
    console.log(categorie);
  }, [categorie]);

  return (
    <Container style={{ textAlign: "center" }} className="mb-5">
      <h2 className="mt-5 mb-3">Scegli la categoria di domande</h2>
      <Row>
        <Col className="mt-3">
          <Card>
            <Button
              variant={categorie.storia ? "success" : "warning"}
              onClick={() => handleScegliCategoria("storia")}
            >
              Storia <span style={{verticalAlign:'1px'}}>{categorie.storia ? <FaRegSquareCheck /> : <FaRegSquareFull />}</span>
            </Button>
          </Card>
        </Col>
        <Col className="mt-3">
          <Card>
            <Button
              variant={categorie.sport ? "success" : "warning"}
              onClick={() => handleScegliCategoria("sport")}
            >
              Sport <span style={{verticalAlign:'1px'}}>{categorie.sport ? <FaRegSquareCheck /> : <FaRegSquareFull />}</span>
            </Button>
          </Card>
        </Col>
        <Col className="mt-3">
          <Card>
            <Button
              variant={categorie.cinema ? "success" : "warning"}
              onClick={() => handleScegliCategoria("cinema")}
            >
              Cinema <span style={{verticalAlign:'1px'}}>{categorie.cinema ? <FaRegSquareCheck /> : <FaRegSquareFull />}</span>
            </Button>
          </Card>
        </Col>
        <Col className="mt-3">
          <Card>
            <Button
              variant={categorie.arte ? "success" : "warning"}
              onClick={() => handleScegliCategoria("arte")}
            >
              Arte <span style={{verticalAlign:'1px'}}>{categorie.arte ? <FaRegSquareCheck /> : <FaRegSquareFull />}</span>
            </Button>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col className="mt-3">
          <Card>
            <Button
              variant={categorie.scienze ? "success" : "warning"}
              onClick={() => handleScegliCategoria("scienze")}
            >
              Scienze <span style={{verticalAlign:'1px'}}>{categorie.scienze ? <FaRegSquareCheck /> : <FaRegSquareFull />}</span>
            </Button>
          </Card>
        </Col>
        <Col className="mt-3">
          <Card>
            <Button
              variant={categorie.cultura ? "success" : "warning"}
              onClick={() => handleScegliCategoria("cultura")}
            >
              Cultura <span style={{verticalAlign:'1px'}}>{categorie.cultura ? <FaRegSquareCheck /> : <FaRegSquareFull />}</span>
            </Button>
          </Card>
        </Col>
        <Col className="mt-3">
          <Card>
            <Button
              variant={categorie.geografia ? "success" : "warning"}
              onClick={() => handleScegliCategoria("geografia")}
            >
              Geografia <span style={{verticalAlign:'1px'}}>{categorie.geografia ? <FaRegSquareCheck /> : <FaRegSquareFull />}</span>
            </Button>
          </Card>
        </Col>
        <Col className="mt-3">
          <Card>
            <Button
              variant={categorie.serietv ? "success" : "warning"}
              onClick={() => handleScegliCategoria("serietv")}
            >
              Serie Tv <span style={{verticalAlign:'1px'}}>{categorie.serietv ? <FaRegSquareCheck /> : <FaRegSquareFull />}</span>
            </Button>
          </Card>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
}

export default Categorie;
