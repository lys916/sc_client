import React from 'react';
import './styleLoader.css';
const Loader = ({message, style})=>{
    return (
        <div className="loader">
            <div style={style} className="spinner-gif"><img src="./spinner.gif" /></div>
            <div style={{fontWeigth: 'bold'}}>{message}</div>
        </div>
    )
}

export default Loader;

