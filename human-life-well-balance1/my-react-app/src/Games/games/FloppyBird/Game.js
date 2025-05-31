import React,{useState,useEffect} from 'react';
import Bird from './Bird';
import Pipe from './Pipe';

const Game=()=>{
    const [pipes,setPipes]=useState([{top:0,height:200,left:500}])
    const pipeSpeed=5;

    useEffect(()=>{
        const interval=setInterval(()=>{
            setPipes(pipes => pipes.map(pipe => ({...pipe,left:pipe.left-pipeSpeed})) );
        },24);

        return ()=>clearInterval(interval);
    },[]);

    return (
        <div style={{position:'relative',width:'100%',height:'600px',overflow:'hidden',backgroundColor:'skyblue'}}>
            <Bird />
            {
                pipes.map(
                     (pipe,index)  =>(
                        <Pipe key={index} top={pipe.top} height={pipe.height} left={pipe.left} />
                )
                )
            }
        </div>
    );
};
export default Game;