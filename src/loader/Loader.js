import React from 'react';
import './styleLoader.css';
const Loader = ({message})=>{
    console.log('loadin message', message);
    return (
        <div className="loader">
            <h4>{message}</h4>
        </div>
    )
}

export default Loader;

