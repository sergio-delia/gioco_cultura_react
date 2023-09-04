import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaRegSquareCheck, FaRegSquareFull, FaVideo, FaFootball, FaVial, FaMap, FaPalette, FaBook, FaAward, FaClapperboard} from "react-icons/fa6";

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
        <Col className="mt-3" xs={6} sm={6} md={3}>
          <Card>
            <Button className="p-2"
              variant={categorie.storia ? "success" : "warning"}
              onClick={() => handleScegliCategoria("storia")}
            >
              <div style={{display:'block'}} className="mb-2"><FaAward size={22}/></div>Storia <span style={{verticalAlign:'1px'}}>{categorie.storia ? <FaRegSquareCheck /> : <FaRegSquareFull />}</span>
            </Button>
          </Card>
        </Col>
        <Col className="mt-3" xs={6} sm={6} md={3}>
          <Card>
            <Button className="p-2"
              variant={categorie.sport ? "success" : "warning"}
              onClick={() => handleScegliCategoria("sport")}
            >
              <div style={{display:'block'}} className="mb-2"><FaFootball size={22}/></div>Sport <span style={{verticalAlign:'1px'}}>{categorie.sport ? <FaRegSquareCheck /> : <FaRegSquareFull />}</span>
            </Button>
          </Card>
        </Col>
        <Col className="mt-3" xs={6} sm={6} md={3}>
          <Card>
            <Button className="p-2"
              variant={categorie.cinema ? "success" : "warning"}
              onClick={() => handleScegliCategoria("cinema")}
            >
              <div style={{display:'block'}} className="mb-2"><FaClapperboard size={22}/></div>Cinema <span style={{verticalAlign:'1px'}}>{categorie.cinema ? <FaRegSquareCheck /> : <FaRegSquareFull />}</span>
            </Button>
          </Card>
        </Col>
        <Col className="mt-3" xs={6} sm={6} md={3}>
          <Card>
            <Button className="p-2"
              variant={categorie.arte ? "success" : "warning"}
              onClick={() => handleScegliCategoria("arte")}
            >
              <div style={{display:'block'}} className="mb-2"><FaPalette size={22}/></div>Arte <span style={{verticalAlign:'1px'}}>{categorie.arte ? <FaRegSquareCheck /> : <FaRegSquareFull />}</span>
            </Button>
          </Card>
        </Col>
        <Col className="mt-3" xs={6} sm={6} md={3}>
          <Card>
            <Button className="p-2"
              variant={categorie.scienze ? "success" : "warning"}
              onClick={() => handleScegliCategoria("scienze")}
            >
              <div style={{display:'block'}} className="mb-2"><FaVial size={22}/></div>Scienze <span style={{verticalAlign:'1px'}}>{categorie.scienze ? <FaRegSquareCheck /> : <FaRegSquareFull />}</span>
            </Button>
          </Card>
        </Col>
        <Col className="mt-3" xs={6} sm={6} md={3}>
          <Card>
            <Button className="p-2"
              variant={categorie.cultura ? "success" : "warning"}
              onClick={() => handleScegliCategoria("cultura")}
            >
              <div style={{display:'block'}} className="mb-2"><FaBook size={22}/></div>Cultura <span style={{verticalAlign:'1px'}}>{categorie.cultura ? <FaRegSquareCheck /> : <FaRegSquareFull />}</span>
            </Button>
          </Card>
        </Col>
        <Col className="mt-3" xs={6} sm={6} md={3}>
          <Card>
            <Button className="p-2"
              variant={categorie.geografia ? "success" : "warning"}
              onClick={() => handleScegliCategoria("geografia")}
            >
              <div style={{display:'block'}} className="mb-2"><FaMap size={22}/></div>Geografia <span style={{verticalAlign:'1px'}}>{categorie.geografia ? <FaRegSquareCheck /> : <FaRegSquareFull />}</span>
            </Button>
          </Card>
        </Col>
        <Col className="mt-3" xs={6} sm={6} md={3}>
          <Card>
            <Button className="p-2"
              variant={categorie.serietv ? "success" : "warning"}
              onClick={() => handleScegliCategoria("serietv")}
            >
              <div style={{display:'block'}} className="mb-2"><FaVideo size={22}/></div>Serie Tv <span style={{verticalAlign:'1px'}}>{categorie.serietv ? <FaRegSquareCheck /> : <FaRegSquareFull />}</span>
            </Button>
          </Card>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
}

export default Categorie;
