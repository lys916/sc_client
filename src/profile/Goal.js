import React from 'react';
import { connect } from 'react-redux';

import './styleProfile.css';

class Goal extends React.Component {
	state = {
	}

	render() {
		const user = this.props.user;
		return (
			user.goalSet ? <div className="ui">
			<div className="header">
				<div className="title title-main">USER GOAL:</div>
				<div className="edit"><i className="material-icons">edit</i></div>
			</div>
			
			<div className="title">Type: &nbsp;
				<span>{user.goalWeight === 'lose' ? 'Lose weight' : null}</span>
				<span>{user.goalWeight === 'lose fast' ? 'Lose weight fast' : null}</span>
				<span>{user.goalWeight === 'maintain' ? 'Maintain weight' : null}</span>
			</div>

			<div className="title">Fat: <span>{user.grams.fat}</span></div>
			<div className="title">Carb: <span>{user.grams.carb}</span></div>
			<div className="title">protein: <span>{user.grams.protein}</span></div>
			<div className="title">Calories: <span>{user.goalCalories}</span></div>
		</div> : null
			
		)
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

export default connect(mapStateToProps, {  })(Goal);