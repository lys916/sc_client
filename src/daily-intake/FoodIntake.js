import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const FoodIntake = ({handleDeleteFood, handleShowMenu, showMenu, foods, isLoading})=>{
    console.log('is laoding', isLoading);
    return (
        <div className="intake-list">
            {!isLoading ? 
            <TransitionGroup>
            { foods.map((food, index)=>{
                return (
                    <CSSTransition key={food._id} timeout={300} classNames="fade">
                    <div className="food-intake">
                        <div className="food-header">
                            <div className="food-name">
                                {food.name} - {food.amount} {food.measurement}
                            </div>
                            <div className="food-cal">
                                {(food.fat * 9)+(food.carb*4)+(food.protein*4)} Cal.
                            </div>
                        </div>

                        <div className="food-nutrition">
                            <div className={`food-fcp ${showMenu === index ? 'move-food-fcp' : null}`}>
                                <div className="nutrition-name">
                                    <div className="food-cell">Fat</div>
                                    <div className="food-cell">Carb</div>
                                    <div className="food-cell">Protein</div>
                                </div>
                                <div className="nutrition-amount">
                                    <div className="food-cell">{food.fat}</div>
                                    <div className="food-cell">{food.carb}</div>
                                    <div className="food-cell">{food.protein}</div>
                                </div>
                            </div>
                            <div className={`edit-delete ${showMenu === index ? 'reset-z' : null}`}>
                                <div className={`edit`}>
                                    <i className="material-icons">edit</i>
                                </div>
                                <div className={`delete`} onClick={()=>{handleDeleteFood(food._id)}}>
                                    <i className="material-icons">delete</i>
                                </div>
                            </div>
                            <div className="more-vert" onClick={()=>{handleShowMenu(index)}}>
                                    <i className="material-icons">more_horiz</i>
                            </div>
                        </div>

                    </div>
                    </CSSTransition>
                )
            })}
            </TransitionGroup>
            :
                <div className="spinner-gif"><img src="./spinner.gif" /></div>
            }
        </div>
    )
}

export default FoodIntake;