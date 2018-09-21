import React from 'react';
import PropTypes from 'prop-types';

import './styleSearchBar.css';


const SearchBar = ({handleSearch, searchTerm})=>{
	return (
		<div className="search">
			<input placeholder="Food name" value={searchTerm} onChange={handleSearch}/>
			<i className="material-icons">search</i>
		</div>
	)
}

SearchBar.propTypes = {
	handleSearch: PropTypes.func.isRequired
}

export default SearchBar;