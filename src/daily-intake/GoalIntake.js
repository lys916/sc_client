import React from 'react';

const GoalIntake = ({fat, carb, protein, handleShowGoalModal, user})=>{
    const consumed = Math.round((fat*9)+(carb*4)+(protein*4));
    
    return (
        <div>
            { user.goalSet ? 
            <div>
                <div className="goal-intake">
                
                <div className="goal-cal title-cal">
                    <div className="goal-title in-title">GOAL</div>
                    <div className="in-amount">{user.goalCalories} Cal.</div>
                </div>
                <div className="daily-cal title-cal">
                    <div  className="daily-title in-title">CONSUMED</div>
                    <div className="in-amount">{consumed} Cal.</div>              
                </div>
                <div className="remaining-cal title-cal">
                    <div  className="remaining-title in-title">REMAINING</div>
                    <div className="in-amount">{user.goalCalories -  consumed} Cal.</div>
                        
                </div>
            </div>
            </div> 
            : 
            <div className="set-goal"> 
                <div className="not-set-goal">You haven't set your goals yet.</div>
                <div className="set-my-goal" onClick={handleShowGoalModal}>Set my goals</div>
            </div>}
            
        </div>
    )
}

export default GoalIntake;