import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { saveGoal } from '../actions/userAction';

function getGrams(cal, training){
	let fat = 0;
	let carb = 0;
	let protein = 0;
	if(training === 'noTrain'){
		fat = (cal * .25) / 9;
		carb = (cal * .50) / 4;
		protein = (cal * .25) / 4;
	}
	if(training === 'lightTrain'){
		fat = (cal * .25) / 9;
		carb = (cal * .45) / 4;
		protein = (cal * .30) / 4;
	}
	if(training === 'moderateTrain'){
		fat = (cal * .25) / 9;
		carb = (cal * .40) / 4;
		protein = (cal * .35) / 4;
	}
	if(training === 'activeTrain'){
		fat = (cal * .20) / 9;
		carb = (cal * .40) / 4;
		protein = (cal * .40) / 4;
	}
	return {fat: Math.round(fat), carb: Math.round(carb), protein: Math.round(protein)};
}

class GoalModal extends React.Component {
	state = {
		showModal: false,
		age: '',
		weight: '',
		feet: '1',
		inch: '0',
		goal: 'lose',
		activity: 'sedentary',
		gender: 'female',
		training: 'noTrain',
		total: 0,
		grams: {fat: 0, carb: 0, protein: 0}
	}
	handleHide = ()=>{
		this.setState({showModal: false});
	}
	handleCalculate = ()=>{
		console.log(this.state);
		const {age, weight, feet, inch, goal, activity, gender, training} = this.state;
		const inches = (Number(feet) * 12) + Number(inch);
		const switchCase = gender + ' ' + goal + ' ' + activity;
		console.log(switchCase);

		const weightCal = (Number(weight) / 2.20462) * 10;
		const heightCal = (inches * 2.54) * 6.25;
		const ageCal = Number(age) * 5; 

		const femBase = Math.round((weightCal + heightCal) - ageCal - 161);
		const malebase = Math.round((weightCal + heightCal) - ageCal + 5);

		// mail maintain
		const maleMainNo = Math.round(malebase + malebase * .20);
		const maleMainLight = Math.round(malebase + malebase * .375);
		const maleMainModerate = Math.round(malebase + malebase * .55);
		const maleMainActive = Math.round(malebase + malebase * .725);
		// mail lose
		const maleLoseNo = Math.round(maleMainNo - maleMainNo * .20);
		const maleLoseLight = Math.round(maleMainLight - maleMainLight * .20);
		const maleLoseModerate = Math.round(maleMainModerate - maleMainModerate * .20);
		const maleLoseActive = Math.round(maleMainActive - maleMainActive * .20);
		// mail lose fast
		const maleLoseFastNo = Math.round(maleMainNo - maleMainNo * .40);
		const maleLoseFastLight = Math.round(maleMainLight - maleMainLight * .40);
		const maleLoseFastModerate = Math.round(maleMainModerate - maleMainModerate * .40);
		const maleLoseFastActive = Math.round(maleMainActive - maleMainActive * .40);

		// female maintain
		const femMainNo = Math.round(femBase + femBase * .20);
		const femMainLight = Math.round(femBase + femBase * .375);
		const femMainModerate = Math.round(femBase + femBase * .55);
		const femMainActive = Math.round(femBase + femBase * .725);
		// female lose
		const femLoseNo = Math.round(femMainNo - femMainNo * .20);
		const femLoseLight = Math.round(femMainLight - femMainLight * .20);
		const femLoseModerate = Math.round(femMainModerate - femMainModerate * .20);
		const femLoseActive = Math.round(femMainActive - femMainActive * .20);
		// female lose fast
		const femLoseFastNo = Math.round(femMainNo - femMainNo * .40);
		const femLoseFastLight = Math.round(femMainLight - femMainLight * .40);
		const femLoseFastModerate = Math.round(femMainModerate - femMainModerate * .40);
		const femLoseFastActive = Math.round(femMainActive - femMainActive * .40);

		switch(switchCase){

			case 'male maintain sedentary':
				this.setState({total: maleMainNo, grams: getGrams(maleMainNo, training)});
				break;
			case 'male maintain light':
				this.setState({total: maleMainLight, grams: getGrams(maleMainLight, training)});
				break;
			case 'male maintain moderate':
				this.setState({total: maleMainModerate, grams: getGrams(maleMainModerate, training)});
				break;
			case 'male maintain active':
				this.setState({total: maleMainActive, grams: getGrams(maleMainActive, training)});
				break;
			case 'male lose sedentary':
				this.setState({total: maleLoseNo, grams: getGrams(maleLoseNo, training)});
				break;
			case 'male lose light':
				this.setState({total: maleLoseLight, grams: getGrams(maleLoseLight, training)});
				break;
			case 'male lose moderate':
				this.setState({total: maleLoseModerate, grams: getGrams(maleLoseModerate, training)});
				break;
			case 'male lose active':
				this.setState({total: maleLoseActive, grams: getGrams(maleLoseActive, training)});
				break;
			case 'male lose fast sedentary':
				this.setState({total: maleLoseFastNo, grams: getGrams(maleLoseFastNo, training)});
				break;
			case 'male lose fast light':
				this.setState({total: maleLoseFastLight, grams: getGrams(maleLoseFastLight, training)});
				break;
			case 'male lose fast moderate':
				this.setState({total: maleLoseFastModerate, grams: getGrams(maleLoseFastModerate, training)});
				break;
			case 'male lose fast active':
				this.setState({total: maleLoseFastActive, grams: getGrams(maleLoseFastActive, training)});
				break;
			//female
			case 'female maintain sedentary':
				this.setState({total: femMainNo, grams: getGrams(femMainNo, training)});
				break;
			case 'female maintain light':
				this.setState({total: femMainLight, grams: getGrams(femMainLight, training)});
				break;
			case 'female maintain moderate':
				this.setState({total: femMainModerate, grams: getGrams(femMainModerate, training)});
				break;
			case 'female maintain active':
				this.setState({total: femMainActive, grams: getGrams(femMainActive, training)});
				break;
			case 'female lose sedentary':
				this.setState({total: femLoseNo, grams: getGrams(femLoseNo, training)});
				break;
			case 'female lose light':
				this.setState({total: femLoseLight, grams: getGrams(femLoseLight, training)});
				break;
			case 'female lose moderate':
				this.setState({total: femLoseModerate, grams: getGrams(femLoseModerate, training)});
				break;
			case 'female lose active':
				this.setState({total: femLoseActive, grams: getGrams(femLoseActive, training)});
				break;
			case 'female lose fast sedentary':
				this.setState({total: femLoseFastNo, grams: getGrams(femLoseFastNo, training)});
				break;
			case 'female lose fast light':
				this.setState({total: femLoseFastLight, grams: getGrams(femLoseFastLight, training)});
				break;
			case 'female lose fast moderate':
				this.setState({total: femLoseFastModerate, grams: getGrams(femLoseFastModerate, training)});
				break;
			case 'female lose fast active':
				this.setState({total: femLoseFastActive, grams: getGrams(femLoseFastActive, training)});
				break;
			default:
				break;
		}

		

	}
	handleOnChange = (e)=>{
		console.log('onchange', e.target.value);
		this.setState({[e.target.name]: e.target.value});
	}
	handleSaveGoal = ()=>{
		const {feet, inch, weight, age, goal, total, grams, training} = this.state;
		const userId = this.props.user._id;
		this.props.saveGoal({
			goal: {
				height: {feet, inch },
				weight: Number(weight),
				age: Number(age),
				goalWeight: goal,
				goalCalories: total,
				goalSet: true,
				grams,
				training,	
			}, 
			userId }, this.props.history);

		this.props.handleHideGoalModal();
	}
	render(){
		console.log('USER goal', this.props.user );
		return (
			<Modal className="food-modal" show={this.props.showGoalModal} onHide={this.props.handleHideGoalModal}>
				 <Modal.Body className="goal-modal">
					<div className="gender">
						
				 		<select className="select-measure" 
								  name="gender" 
								  onChange={this.handleOnChange}>
								  <option value="female">Female</option>
								<option value="male">Male</option>
						</select>

					  <input name="age" placeholder="Age" value={this.state.age} onChange={this.handleOnChange}/>
					</div>

					<div className="weight">
					  <input name="weight" placeholder="Weight" value={this.state.weight} onChange={this.handleOnChange}/><span>Lbs</span>
					</div>
					<div className="height">
					<select className="select-feet" 
								  name="feet" 
								  onChange={this.handleOnChange}>
							<option value="0">Height</option>
							<option value="1">1 ft</option>
							<option value="2">2 ft</option>
							<option value="3">3 ft</option>
							<option value="4">4 ft</option>
							<option value="5">5 ft</option>
							<option value="6">6 ft</option>
							<option value="7">7 ft</option>
							<option value="8">8 ft</option>
						</select>
						<select className="select-inch" 
								  name="inch" 
								  onChange={this.handleOnChange}>
							<option value="0">0 in</option>
							<option value="1">1 in</option>
							<option value="2">2 in</option>
							<option value="3">3 in</option>
							<option value="4">4 in</option>
							<option value="5">5 in</option>
							<option value="6">6 in</option>
							<option value="7">7 in</option>
							<option value="8">8 in</option>
							<option value="9">9 in</option>
							<option value="10">10 in</option>
							<option value="11">11 in</option>
						</select>
					
					</div>

						<select className="select-goal" 
								  name="goal" 
								  onChange={this.handleOnChange}>
							<option value="lose">Lose weight</option>
							<option value="lose fast">Lose weight fast</option>
							<option value="maintain">Maintain weight</option>
						</select>
						<br/>

						<select className="select-exercise" 
								  name="activity" 
								  onChange={this.handleOnChange}>
							<option value="sedentary">Sedentary - Little or no exercise.</option>
							<option value="light">Light - Exercise 1-3 x/week.</option>
							<option value="moderate">Moderate - Exercise 3-5 x/week. </option>
							<option value="active">Active - Exercise 6-7 x/week.</option>
						</select>


						<select className="select-training" 
								  name="training" 
								  onChange={this.handleOnChange}>
							<option value="noTrain">Little or no weight training.</option>
							<option value="lightTrain">Light - Keep toned.</option>
							<option value="moderateTrain">Moderate - Build muscle.</option>
							<option value="activeTrain">Active - Build extra muscle.</option>
						</select>
						<br/>

						<Button onClick={this.handleCalculate}>Calculate</Button>

						{ this.state.total > 0 ? 
						<div>
							<div>
								For a healthy balance on your daily intake, you should take:
							</div>
							<div className="modal-nuts">
								<div className="nut">Fat: {this.state.grams.fat} g</div>
								<div className="nut">Carb: {this.state.grams.carb} g</div>
								<div className="nut">Protein: {this.state.grams.protein} g</div>
							</div>
							<div className="modal-total-cal">Calories: {this.state.total}</div>
						</div> : null
						}

				 </Modal.Body>
				 <Modal.Footer className="modal-footer">
					  <Button className="setgoal-cancel" onClick={this.handleHideGoalModal}>Cancel</Button>
					  <Button className="setgoal-save" onClick={this.handleSaveGoal}>Save</Button>
				 </Modal.Footer>
			</Modal>
 		);
	}
}

const mapStateToProps = (state) => {
	return {
	} 
}

export default connect(mapStateToProps, { saveGoal })(GoalModal);