import React from 'react';
import s from './styleDailyIntake.css';

const AmountIntake = ({fat, carb, protein})=>{
    return (
        <div className="amount-intake">
            <div className="nutrients">
                <div className="nutrient fat">
                    <div className="top">FAT</div>
                    <div className="middle">{Math.round(fat)}<span> g</span></div>
                    <div>Goal 36 g</div>
                </div>

                <div className="nutrient carb">
                    <div className="top">CARB</div>
                    <div className="middle">{carb}<span> g</span></div>
                    <div>Goal 210 g</div>
                </div>

                <div className="nutrient protein">
                    <div className="top">PROTEIN</div>
                    <div className="middle">{protein}<span> g</span></div>
                    <div>Goal 92 g</div>
                </div>
                {/* <div className="nutrient total-cal">
                    <div className="total top">TOTAL</div>
                    <div className="middle">{(fat*9)+(carb*4)+(protein*4)}</div>
                    <div className="bottom">CALORIES</div>
                </div> */}
            </div>
            <div className="total">
            </div>
        </div>
    )
}

export default AmountIntake;