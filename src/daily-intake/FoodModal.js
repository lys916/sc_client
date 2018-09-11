import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const FoodModal = ({showModal, handleHide, customFoods, toggleActive, addToDaily, toggleEditing, handleOnChange, errorMessage, handleSearch})=>{
return (
        <Modal className="food-modal" show={showModal} onHide={handleHide}>
            {/* <Modal.Header className="modal-header">
                <input placeholder="Search" onChange={handleSearch}/>
                
                
            </Modal.Header> */}
            <Modal.Body className="food-modal-body">
                {customFoods.map((food, index)=>{
                    return(
                        <div key={food._id} className="custom-food">
                        <div className="food-header">
                        {   food.editing ?
                            <div className="food-name">
                                {food.name} - {food.amount} {food.measurement}
                            </div> 
                            :
                            <div className="food-name">
                                {food.name} - {food.amount} {food.measurement}
                            </div>  
                        }
                            <div className="food-cal">
                                {(food.fat * 9)+(food.carb*4)+(food.protein*4)} Cal.
                            </div>
                        </div>

                        <div className="food-nutrition">
                            <div className="food-fcp">
                                <div className="nutrition-name">
                                    <div className="food-cell">Fat</div>
                                    <div className="food-cell">Carb</div>
                                    <div className="food-cell">Protein</div>
                                </div>
                                {   food.editing ? 
                                    <div className="nutrition-amount">
                                        <input name="fat" className="food-cell" value={food.fat} onChange={(e)=>{handleOnChange(e, food._id)}}/>
                                        <input name="carb" className="food-cell" value={food.carb} onChange={(e)=>{handleOnChange(e, food._id)}}/>
                                        <input name="protein" className="food-cell" value={food.protein} onChange={(e)=>{handleOnChange(e, food._id)}}/>
                                    </div> 
                                    : 
                                    <div className="nutrition-amount">
                                        <div className="food-cell">{food.fat}</div>
                                        <div className="food-cell">{food.carb}</div>
                                        <div className="food-cell">{food.protein}</div>
                                    </div>
                                }
                            </div>
                            <div className="custom-edit-add">
                                <div className={`custom-edit ${food.editing ? 'food-editing' : null}`} onClick={()=>{toggleEditing(food._id)}}>
                                    <i className="material-icons">edit</i>
                                </div>
                                <div className={`custom-add ${food.active ? 'food-active' : null}`} onClick={()=>{toggleActive(food._id)}}>
                                    <i className="material-icons">add</i>
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