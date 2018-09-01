import React from 'react';

const GoalIntake = ({fat, carb, protein})=>{
    const consumed = Math.round((fat*9)+(carb*4)+(protein*4));
    return (
        <div className="testss">
            <div className="goal-total-cal">Daily Calories</div>
            <div className="goal-intake">
                
                <div className="goal-cal title-cal">
                    <div className="goal-title in-title">GOAL</div>
                    <div className="in-amount">1300 Cal.</div>
                </div>
                <div className="daily-cal title-cal">
                    <div  className="daily-title in-title">CONSUMED</div>
                    <div className="in-amount">{consumed} Cal.</div>              
                </div>
                <div className="remaining-cal title-cal">
                    <div  className="remaining-title in-title">REMAINING</div>
                    <div className="in-amount">{1300 -  consumed} Cal.</div>
                        
                </div>
            </div>
        </div>
    )
}

export default GoalIntake;