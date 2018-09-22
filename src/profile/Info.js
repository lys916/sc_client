import React from 'react';
import { connect } from 'react-redux';
import './styleProfile.css';

class Info extends React.Component {
	state = {
	}

	render() {
		const user = this.props.user;
		console.log(user);
		return (
			<div className="ui">
				<div className="header">
					<div className="title title-main">USER INFO:</div>
					<div className="edit"><i className="material-icons">edit</i></div>
				</div>
				<div className="title">Username: <span>{user.username}</span></div>
				<div className="title">Gender: <span>Need gender</span></div>
				<div className="title">Age: <span>{user.age}</span></div>
				<div className="title">Height: <span>{user.height.feet} ft {user.height.inch} in</span></div>
				<div className="title">Weight: <span>{user.weight}</span></div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

export default connect(mapStateToProps, {})(Info);