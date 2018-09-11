import React from 'react';
import './styleLoader.css';
const Loader = ({message})=>{
    return (
        <div className="loader">
            <h4>{message}</h4>
        </div>
    )
}

export default Loader;

