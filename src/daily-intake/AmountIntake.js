import React from 'react';
import s from './styleDailyIntake.css';

const AmountIntake = ({fat, carb, protein, user})=>{
    console.log('GOAL USER', user);
    return (
        <div className="amount-intake">
            { user.goalSet ? 
            <div className="nutrients">
                <div className="nutrient fat">
                    <div className="top">FAT</div>
                    <div className="middle">{Math.round(fat)}<span> g</span></div>
                    <div>Goal {user.grams.fat} g</div>
                </div>

                <div className="nutrient carb">
                    <div className="top">CARB</div>
                    <div className="middle">{carb}<span> g</span></div>
                    <div>Goal {user.grams.carb} g</div>
                </div>

                <div className="nutrient protein">
                    <div className="top">PROTEIN</div>
                    <div className="middle">{protein}<span> g</span></div>
                    <div>Goal {user.grams.protein} g</div>
            </div>
            </div> : <div><br/><br/></div>
            }
            
        </div>
    )
}

export default AmountIntake;