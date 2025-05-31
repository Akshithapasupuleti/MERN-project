import './MemoryGame.css';
import {useEffect,useState} from 'react';
import helmet from './Mimage/helmet-1.png';
import potion from './Mimage/potion-1.png';
import ring from './Mimage/ring-1.png';
import scroll from './Mimage/scroll-1.png';
import shield from './Mimage/shield-1.png';
import sword from './Mimage/sword-1.png';
import cover from "./Mimage/cover.png";
import SingleCard from './SingleCard';
const cardImages=[
    {"src":helmet,matched:false},
    {"src":potion,matched:false},
    {"src":ring,matched:false},
    {"src":scroll,matched:false},
    {"src":shield,matched:false},
    {"src":sword,matched:false}
]
function MagicMatch()
{
    const [cards,setCards]=useState([]);
    const [turns,setTurns]=useState(0);
    const [choiceOne,setChoiceOne]=useState(null);
    const [choiceTwo,setChoiceTwo]=useState(null);
    const [content,setContent]=useState('cardsInfo');
    const [disabled,setDisabled]=useState(false);
    //shuffle cards

    const shuffleCards = ()=>{

    const shuffledCards=[...cardImages,...cardImages]
    .sort(()=>Math.random()-0.5)
    .map((card)=>({...card,id:Math.random()}))

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards)
    setTurns(0);
   

    }
    const handleChoice=(card)=>{
        choiceOne ? setChoiceTwo(card):setChoiceOne(card);
    }
    useEffect( ()=> {
       
        if(choiceOne && choiceTwo)
            {
                if(choiceOne.src===choiceTwo.src)
                    {
                        setDisabled(true);
                        console.log("those card match");
                        setContent("those card match")
                        setCards
                        (
                        prevCards => 
                        {
                                return prevCards.map
                                (
                                    card =>
                                    {
                                        if(card.src===choiceOne.src)
                                            return {...card,matched:true}
                                        else
                                        return card;
                                    }
                                )
                        }
                        )
    
                        resetTurn();
                        
                    }
                    else{
                        console.log("those cards didnot match");
                       setContent("those cards did not match");
                        setTimeout(()=>resetTurn(),1000);
                    }
            }
    }, [choiceOne,choiceTwo])
   
    const resetTurn=()=>{
        setChoiceOne(null);
        setChoiceTwo(null);
        setTurns(prevTurns => prevTurns + 1);
        setDisabled(false);
    }
    useEffect(
        ()=>{
            shuffleCards()
        },[]
    )
    return(
        <div className="memoryGame">
            <h1>Magic Match</h1>
            <button onClick={shuffleCards}>New Game</button>
           <div className="card-grid">
            {
            cards.map
            (
                card =>
                (
                   <SingleCard 
                   key={card.id} 
                   card={card} 
                   handleChoice={handleChoice}
                   flipped={card === choiceOne || card===choiceTwo || card.matched}
                   disabled={disabled}
                   />
                )
            )
            }
           </div>
           <p>Turns:{turns}</p>
        </div>
    )
}
export default MagicMatch;
export {cover};