import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const FoodModal = ({showModal, handleHide, customFoods, toggleActive, addToDaily, toggleEditing, handleOnChange, errorMessage, handleSearch, handleSort})=>{
return (
        <Modal className="food-modal" show={showModal} onHide={handleHide}>
        {/* HEADER - SEARCH, SORT DROP-DOWN */}
            <Modal.Header className="modal-header">
                <input placeholder="Search" onChange={handleSearch}/>
                <select className="sort-food" name="sort" onChange={handleSort}>
                    <option value="">Sort</option>
                    <option value="name">Name</option>
                    <option value="fat">Fat</option>
                    <option value="carb">Carb</option>
                    <option value="protein">Protein</option>
                    <option value="calories">Calories</option>
                </select>
                
            </Modal.Header>
            <Modal.Body className="food-modal-body">
                {/* CUST FOOD LIST */}
                {customFoods.map((food, index)=>{
                    return(
                        <div key={food._id} className="custom-food">
                            <div className="food-header">
                            {/* IF FOOD EDITING IS TRUE, SHOW INPUT FOR USER TO EDIT */}
                            {   food.editing ?
                                <div className="food-name">
                                    <input className="edit-name" name="name" value={food.name} onChange={(e)=>{handleOnChange(e, food._id)}}/><br/>
                                    <input className="edit-amount" name="amount" value={food.amount} onChange={(e)=>{handleOnChange(e, food._id)}}/>
                                    {food.measurement}
                                </div> 
                                :
                                // OTHERWISE, SHOW FOOD DATA
                                <div className="food-name">
                                    <span>{food.name} - {food.amount} {food.measurement}</span> 
                                </div>  
                            }
                            {/* FOOD TOTAL CALORIES */}
                            <div className="food-cal">
                                        {(food.fat * 9)+(food.carb*4)+(food.protein*4)} Cal.
                                    </div>
                            </div>
                            {/* FOOD NUTRITION*/}
                            <div className="food-nutrition">
                                <div className="food-fcp">
                                    <div className="nutrition-name">
                                        <div className="food-cell">Fat</div>
                                        <div className="food-cell">Carb</div>
                                        <div className="food-cell">Protein</div>
                                    </div>
                                    {/* IF FOOD EDITING IS TRUE, SHOW INPUT FOR USER TO EDIT */}
                                    {   food.editing ? 
                                        <div className="nutrition-amount">
                                            <input name="fat" className="food-cell" value={food.fat} onChange={(e)=>{handleOnChange(e, food._id)}}/>
                                            <input name="carb" className="food-cell" value={food.carb} onChange={(e)=>{handleOnChange(e, food._id)}}/>
                                            <input name="protein" className="food-cell" value={food.protein} onChange={(e)=>{handleOnChange(e, food._id)}}/>
                                        </div> 
                                        : 
                                        // OTHERWISE, SHOW FOOD DATA
                                        <div className="nutrition-amount">
                                            <div className="food-cell">{food.fat}</div>
                                            <div className="food-cell">{food.carb}</div>
                                            <div className="food-cell">{food.protein}</div>
                                        </div>
                                    }
                                </div>
                                {/* EDIT AND ADD BUTTON */}
                                <div className="custom-edit-add">
                                    <div className={`custom-edit ${food.editing ? 'food-editing' : null}`} onClick={()=>{toggleEditing(food._id)}}>
                                        <i className="material-icons">edit</i>
                                        <div className="edit-icon-title">Edit</div>
                                    </div>
                                    <div className={`custom-add ${food.active ? 'food-active' : null}`} onClick={()=>{toggleActive(food._id)}}>
                                        <i className="material-icons">add</i>
                                        <div className="add-icon-title">Add</div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    )
                })}
               
            </Modal.Body>
            <Modal.Footer className="modal-footer">
                <div>{errorMessage}</div>
                <Button className="footer-button" onClick={handleHide}>Close</Button>
                <div className="custom-add-button">
                    <Button className="add-custom-food" onClick={addToDaily}>Add</Button>
                </div>
            </Modal.Footer>
        </Modal>
);
}

export default FoodModal;