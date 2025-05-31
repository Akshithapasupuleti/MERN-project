import React from 'react';

const Pipe=({top,height,left})=>{
    return (
        <div style={{
            position:'absolute',
            top:`${top}px`,
            left:`${left}px`,
            width:'50px',
            height:`${height}px`,
            backgroundColor:'green'
        }}
        >

        </div>
    )
}
export default Pipe;