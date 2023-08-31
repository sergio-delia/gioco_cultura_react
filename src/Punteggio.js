import { useGiocatori } from "./GiocatoriContext"

function Punteggio() {

    const { giocatori, aggiungiPunteggio } = useGiocatori()

    const funzione = () => {
        console.log(giocatori);
    }

  return (
    <div>
        <button onClick={funzione}>Add2</button>
        <ul>
            {giocatori.map((giocatore) => (
                <li key={giocatore.id}>{giocatore.nome} : {giocatore.punteggio} <button onClick={() => aggiungiPunteggio(giocatore.id, 3)}>Add</button></li>
            ))}
        </ul>
    </div>
  )
}

export default Punteggio