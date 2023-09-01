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
    <div>
        <button onClick={funzione}>Add2</button>
        <ul>
            {giocatori.map((giocatore) => (
                <li key={giocatore.id}>{giocatore.nome} : {giocatore.punteggio}
                <button onClick={() => aggiungiPunteggio(giocatore.id)}>Add</button>
                <button onClick={() => sottrai(giocatore)}>Subtract</button>
                </li>
            ))}
        </ul>
        <ToastContainer />
    </div>
  )
}

export default Punteggio