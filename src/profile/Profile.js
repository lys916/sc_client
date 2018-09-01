import React from 'react';
import { connect } from 'react-redux';
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
		return (
			<div className={`profile ${this.state.showPage ? 'show-profile-page' : null}`}>
                PROFILE
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
	} 
}

export default connect(mapStateToProps, { })(Profile);