import { useEffect, useState } from "react"
import { useGiocatori } from "./GiocatoriContext"
import { useNavigate } from "react-router-dom"
import Punteggio from "./Punteggio"

function Play() {

    const { giocatori } = useGiocatori()
    const navigate = useNavigate()

    const [carteSelezionate, setCarteSelezionate] = useState({
        luogo: false,
        personaggio: false,
        animale: false,
        oggetto: false
    })

    useEffect(() => {
        if(giocatori.length < 2){
            navigate('/partecipanti')
        }
    }, [])
    

    const selectCard = (item) => {
        switch (item) {
            case 'luogo':
                console.log('Ciaooo');
                setCarteSelezionate({...carteSelezionate, luogo: !carteSelezionate.luogo})
                break;
            case 'personaggio':
                setCarteSelezionate({...carteSelezionate, personaggio: !carteSelezionate.personaggio})
                break;
            case 'animale':
                setCarteSelezionate({...carteSelezionate, animale: !carteSelezionate.animale})
                break;
            case 'oggetto':
                setCarteSelezionate({...carteSelezionate, oggetto: !carteSelezionate.oggetto})
                break;
            default:
                break;
        }
    }

  return (
<>
<Punteggio />
    <div>
        <button className={carteSelezionate.luogo ? 'selectedCard' : 'noSelectedCard' } onClick={() => selectCard('luogo')}>Luogo</button>
        <button className={carteSelezionate.personaggio ? 'selectedCard' : 'noSelectedCard' } onClick={() => selectCard('personaggio')}>Personaggio</button>
        <button className={carteSelezionate.animale ? 'selectedCard' : 'noSelectedCard' } onClick={() => selectCard('animale')}>Animale</button>
        <button className={carteSelezionate.oggetto ? 'selectedCard' : 'noSelectedCard' } onClick={() => selectCard('oggetto')}>Oggetto</button>

        <hr />
        <button></button>
    </div>
</>
  )
}

export default Play