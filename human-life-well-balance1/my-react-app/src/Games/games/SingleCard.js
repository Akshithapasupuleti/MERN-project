import './SingleCard.css';
import cover from './Mimage/cover.png';
export default function SingleCard({card,handleChoice,flipped,disabled})
{
    const handleClick=()=>{
        if(!disabled){
        handleChoice(card);
        }
    }
return (
            <div className="card" key={card.id}>
                <div className={flipped? "flipped":""}>
                    <img className="front" 
                    src={card.src} 
                    alt="card front" 
                    onClick={handleClick} 
                    />
                    <img
                     className="back" 
                     src={cover} 
                     alt="card back"
                     onClick={handleClick} 
                     /> 
                </div>
           </div>
)
}