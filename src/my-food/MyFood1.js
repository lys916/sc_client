import React from 'react';
import { connect } from 'react-redux';
import './styleMyFood1.css';

class MyFood1 extends React.Component {
	

	render(){

		return (
			<div className="mf">

                <div className="title-box">
                    <div className="title">
                        <div className="nut align-left">Amount</div>
                        <div className="nut">Fat</div>
                        <div className="nut">Carb</div>
                        <div className="nut">Protein</div>
                        <div className="nut">Calories</div>
                    </div>
                    <div className="nut-space"></div>
                </div>

                <div className="food-box">
                    <div className="food">
                        <div className="food-name align-left">This is a type of food</div>
                        <div className="amounts">
                            <div className="amount align-left">1 cup</div>
                            <div className="amount">3</div>
                            <div className="amount">6</div>
                            <div className="amount">8</div>
                            <div className="amount">123</div>
                        </div>
                    </div>

                    <div className="menu">
                    Add
                    </div>

                </div>
                
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {

	} 
}

export default connect(mapStateToProps, { })(MyFood1);