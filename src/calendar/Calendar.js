import React from 'react';
import { connect } from 'react-redux';
import './styleCalendar.css';
class Calendar extends React.Component {
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
			<div className={`calendar ${this.state.showPage ? 'show-calendar-page' : null}`}>
                CALENDAR
				<p>Coming soon!</p>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
	} 
}

export default connect(mapStateToProps, { })(Calendar);