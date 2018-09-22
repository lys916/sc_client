import React from 'react';
import { connect } from 'react-redux';
import { signOut } from '../actions/userAction';

import './styleProfile.css';

class Username extends React.Component {
	state = {
	}

	render() {
		const user = this.props.user;
		return (
			<div className="ui">
                <div className="un">
                    <div className="left">
                        <div className="avatar"></div>
                        <div className="name-box">
                            <div className="username">{user.username}</div>
                            <div className="signout" onClick={() => { this.props.signOut(this.props.history) }}>Sign out</div>
                        </div>
                    </div>
                    <div className="right">
                        <i className="material-icons">edit</i>
                    </div>
                </div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

export default connect(mapStateToProps, { signOut })(Username);