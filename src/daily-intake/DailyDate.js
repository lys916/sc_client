import React from 'react';
import Moment from 'react-moment';
import 'moment-timezone';

const DailyDate = ({dateToFormat})=>{
    return (
        <div className="date-box">
            <Moment format="ddd MMM Do">{dateToFormat}</Moment>
        </div>
    )
}

export default DailyDate;