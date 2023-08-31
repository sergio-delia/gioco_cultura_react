import React, { useState } from 'react';
import Card from './Card';

const CardGame = () => {
  const cards = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  const [deck, setDeck] = useState(cards.slice());
  const [tableCards, setTableCards] = useState([]);

  // Funzione per mescolare le carte
  const shuffleDeck = () => {
    const shuffledDeck = [...cards];
    for (let i = shuffledDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
    }
    setDeck(shuffledDeck);
  };

  // Funzione per pescare una carta dal mazzo
  const drawCard = () => {
    if (deck.length > 0) {
      const drawnCard = deck.pop();
      setTableCards([...tableCards, drawnCard]);
    }
  };

  // Inizializza il mazzo
  const initializeDeck = () => {
    setTableCards([]);
    setDeck(cards.slice());
  };

  return (
    <div>
      <button onClick={shuffleDeck}>Mescola il mazzo</button>
      <button onClick={drawCard}>Pesca una carta</button>
      <button onClick={initializeDeck}>Ripristina il mazzo</button>
      <div className="table">
        {tableCards.map((card, index) => (
          <Card key={index} card={card} />
        ))}
      </div>
    </div>
  );
};

export default CardGame;