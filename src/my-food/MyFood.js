import React from 'react';
import { connect } from 'react-redux';
import './styleMyFood.css';

class MyFood extends React.Component {
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
			<div className={`my-food ${this.state.showPage ? 'show-my-food-page' : null}`}>
				<div>My custom food</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		customFoods: state.customFoods
	} 
}

export default connect(mapStateToProps, { })(MyFood);