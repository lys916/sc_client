import React from 'react';
import Moment from 'react-moment';
import 'moment-timezone';


const DailyDate = ({dateToFormat, handleSetDay})=>{
    console.log('DATE TO FORMAT', dateToFormat);
    return (
        <div className="date-box">
            <i className="material-icons" onClick={()=>{handleSetDay(-1)}}>arrow_back_ios</i>
            <Moment format="ddd MMM Do">{dateToFormat}</Moment>
            <i className="material-icons" onClick={()=>{handleSetDay(1)}}>arrow_forward_ios</i>
        </div>
    )
}

export default DailyDate;