// import React from 'react';
// import './styleCreateForm.css';

// const units = ['cup', 'oz', 'gram', 'tsp', 'tbsp', 'lb']

// const SelectedFood = ({ handleOnChange, name, fat, carb, protein, handleCreateFood, handleCancelCreate, amount, selectedFood }) => {
// 	return (
// 		<form className="cform">
// 			<div className="title">Food name</div>
// 			<input name="name" autoComplete="off" value={name} placeholder="Food name" onChange={handleOnChange} />

// 			<div className="title">Amount</div>
// 			<div className="unit">
// 				<div className="amount">
// 					<input name="amount" value={amount} onChange={handleOnChange} placeholder="Amount" />
// 				</div>
				
// 				{ selectedFood ? 
// 					<select className="select-unit" name="measurement" onChange={handleOnChange}>
// 					{ selectedFood.measurements.map((unit)=>{
// 						return <option value={unit}>{unit}</option>
// 					})}
// 					</select>
// 				:
// 					<select className="select-unit" name="measurement" onChange={handleOnChange}>
// 					{ units.map((unit)=>{
// 						return <option value={unit}>{unit}</option>
// 					})}
// 					</select>
// 				 }
// 			</div>

// 			<div className="nuts">
// 				<div className="fat nut">
// 					<div className="title">Fat</div>
// 					<div className="fat">
// 						<input name="fat" value={fat} onChange={handleOnChange} placeholder="Fat" />
// 					</div>
// 				</div>

// 				<div className="carb nut">
// 					<div className="title">Carb</div>
// 					<div className="carb">
// 						<input name="carb" value={carb} onChange={handleOnChange} placeholder="Carb" />
// 					</div>
// 				</div>

// 				<div className="protein nut">
// 					<div className="title">Protein</div>
// 					<div className="protein">
// 						<input name="protein" value={protein} onChange={handleOnChange} placeholder="Protein" />
// 					</div>
// 				</div>
// 			</div>
// 			<button className="create-button" onClick={handleCreateFood}>
// 				Create
// 				</button>
// 			<button className="cancel-button" onClick={handleCancelCreate}>
// 				Cancel
//                 </button>
// 		</form>
// 	)
// }

// export default SelectedFood;