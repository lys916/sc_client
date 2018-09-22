import React from 'react';
import { connect } from 'react-redux';
import { signOut } from '../actions/userAction';
import Info from './Info';
import Goal from './Goal';
import Username from './Username';
import './styleProfile.css';

class Profile extends React.Component {
	state = {
		showPage: false
	}
	componentDidMount() {
		setTimeout(() => {
			this.setState({ showPage: true });
		}, 0);
	}
	render() {
		console.log('Profile renders');
		return (
			<div className={`profile ${this.state.showPage ? 'show-profile-page' : null}`}>
				<Username history={this.props.history}/>
				<Info />
				<Goal />
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
	}
}

export default connect(mapStateToProps, { signOut })(Profile);