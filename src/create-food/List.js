import React from 'react';
import './styleList.css';

const List = ({list, handleSelectFood,})=>{
	return (
        <div className="list">
            {list.map(food=>{
                return (
                    <div className="food" key={food._id} onClick={()=>{handleSelectFood(food)}}>{food.name}</div>
                )

            })}
        </div>	
	)
}

export default List;