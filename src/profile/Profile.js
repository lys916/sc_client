import React from 'react';
import { connect } from 'react-redux';
import { signOut } from '../actions/userAction';

import './styleProfile.css';

class Profile extends React.Component {
    state = {
        showPage: false
    }
    componentDidMount(){
		setTimeout(()=>{
            this.setState({showPage: true});
		},0);
	}
	render(){
		console.log('Profile renders');
		return (
			<div className={`profile ${this.state.showPage ? 'show-profile-page' : null}`}>
                PROFILE
				<p>Coming soon!</p>
				<br/><br/><br/><br/><br/><br/><br/><br/><br/>
				<button onClick={()=>{this.props.signOut(this.props.history)}}>Sign Out</button>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
	} 
}

export default connect(mapStateToProps, { signOut })(Profile);