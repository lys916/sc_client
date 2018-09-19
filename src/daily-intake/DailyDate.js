import React from 'react';
import Moment from 'react-moment';
import 'moment-timezone';


const DailyDate = ({dateToFormat, handleSetDay, handleMouseDown, handleMouseUp, mouseDown})=>{
    console.log('date to format', dateToFormat);
    return (
        <div className="date-box">
            <div className={`arrow ${mouseDown === 'leftArrow' ? 'mouse-down' : 'mouse-up'}`} onClick={()=>{handleSetDay(-1)}} onMouseDown={()=>{handleMouseDown('leftArrow')}} onMouseUp={handleMouseUp}>
            <i className="material-icons">arrow_back_ios</i>
            </div>
            <div className="date">
            <Moment format="ddd MMM Do">{dateToFormat}</Moment>
            </div>
            <div className={`arrow ${mouseDown === 'rightArrow' ? 'mouse-down' : 'mouse-up'}`} onClick={()=>{handleSetDay(1)}} onMouseDown={()=>{handleMouseDown('rightArrow')}} onMouseUp={handleMouseUp}>
            <i className="material-icons" >arrow_forward_ios</i>
            </div>
        </div>
    )
}

export default DailyDate;