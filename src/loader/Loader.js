import React from 'react';
import './styleLoader.css';
const Loader = ({message})=>{
    return (
        <div className="loader">
            <div className="spinner-gif"><img src="./spinner.gif" /></div>
        </div>
    )
}

export default Loader;

