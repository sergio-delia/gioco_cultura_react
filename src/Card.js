import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ card, onClick }) => {
  return (
    <motion.div
      className="card"
      onClick={onClick}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {card}
    </motion.div>
  );
};

export default Card;