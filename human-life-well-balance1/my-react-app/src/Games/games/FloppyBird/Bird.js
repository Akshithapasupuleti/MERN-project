import React,{useState,useEffect} from 'react';
const Bird =()=>
{
    const [birdPosition,setBirdPosition]=useState(250);
    const gravity=6;

    useEffect(
        ()=>{
            const interval=setInterval(()=>{
                setBirdPosition(birdPosition=>birdPosition+gravity)
            },24);
            return ()=>clearInterval(interval);
        },[]);

        const handleKeyDown = ()=>{
            setBirdPosition(birdPosition=>birdPosition-50);
        };

        useEffect(()=>{
            return ()=>{
                window.removeEventListener('keydown',handleKeyDown)
            };
        },[]);

        return (
            <div style={{position:'absolute',
                top:`${birdPosition}px`,
                left:'100px',
                width:'50px',
                height:'50px',
                backgroundColor:'yellow',
            }}>

            </div>
        )

}

export default Bird;