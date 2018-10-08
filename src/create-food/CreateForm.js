import React from 'react';
import Loader from '../loader/Loader';
import './styleCreateForm.css';
const units = ['cup', 'oz', 'tbsp', 'tsp', 'gram', 'lb', 'scoop', 'inch', 'md', 'lg', 'sm', 'piece', 'item', 'serv',]

const CreateForm = ({handleOnChange, name, fat, carb, protein, handleCreateFood, handleCancelCreate, amount, creating, selectedFood})=>{
	return (
        <form className="cform">
            <div className="name nut">
            <div className="title">Food name</div>
            <input name="name" autoComplete="off" value={name} placeholder="Food name" onChange={handleOnChange} />
            </div>

            <div className="title">Amount</div>
            <div className="unit">
                <div className="amount">
                    <input name="amount" value={amount} onChange={handleOnChange} placeholder="Amount"/>
                </div>
                { selectedFood ? 
					<select className="select-unit" name="measurement" onChange={handleOnChange}>
					{ selectedFood.measurements.map((unit, index)=>{
						return <option value={unit}>{unit}</option>
					})}
					</select>
				:
					<select className="select-unit" name="measurement" onChange={handleOnChange}>
					{ units.map((unit)=>{
						return <option value={unit}>{unit}</option>
					})}
					</select>
				 }
            </div> 
            
            <div className="nuts">
                <div className="fat nut">
                    <div className="title">Fat</div>
                    <div className="fat">
                        <input name="fat" value={fat} onChange={handleOnChange} placeholder="Fat"/>
                    </div>
                </div>

                <div className="carb nut">
                    <div className="title">Carb</div>
                    <div className="carb">
                        <input name="carb" value={carb} onChange={handleOnChange} placeholder="Carb"/>
                    </div>
                </div>

                <div className="protein nut">
                    <div className="title">Protein</div>
                    <div className="protein">
                        <input name="protein" value={protein} onChange={handleOnChange} placeholder="Protein"/>
                    </div>
                </div>
            </div>

            <button className="cancel-button" onClick={handleCancelCreate}>
                Cancel
             </button>

            <button className="create-button" onClick={handleCreateFood}>
				Create
			</button>
            
            {creating ? 
            <div>
                <Loader />
            </div> : null
            }
        </form>
	)
}

export default CreateForm;