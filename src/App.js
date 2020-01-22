import React, { Component } from 'react';
import './App.scss';

// Components
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
// import TestProducts from './components/TestProducts';

export default class App extends Component {

	render() {
		return (
			<div className="main">
				<h1 className="main__heading">StudioME Analytics</h1>
				<ProductList />
				{/* <TestProducts /> */}
				<AddProduct />
			</div>
		)
	}
}