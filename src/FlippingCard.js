import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";

const FlippingCard = ({ frontContent, backContent, flipAll }) => {
  const [isFlipped, setIsFlipped] = useState(false);

    useEffect(() => {
      setIsFlipped(false)
    }, [flipAll])
    

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flipping-card" onClick={flipCard}>
      <Card>
        <div className={`card-inner ${isFlipped ? "flipped" : ""}`}>
          <div className="front">{frontContent}</div>
          <div className="back">{backContent}</div>
        </div>
      </Card>
    </div>
  );
};

export default FlippingCard;
