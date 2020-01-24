import React, { Component } from 'react';
import './App.scss';

// Components
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
// import TestProducts from './components/TestProducts';// Components
import ProductDetails from './components/ProductDetails';

// Apollo
import { graphql } from 'react-apollo';

// Queries
import { getProductsQuery } from './queries/queries';

class App extends Component {

	state = {
        selected: null,
    }

    displayProducts = () => {
        let data = this.props.data;
        if (data.loading) {
            return( <div>Loading products...</div>);
        } else {
            return data.products.map(product => {
                return (
                    <li
                        key={product.id}
                        onClick={(e) => {this.setState({selected: product.id})}}
                        className={product.id === this.state.selected ? "list__item--active" : "list__item"}
                    >
                        { product.name }
                    </li>
                )
            })
        }
    }

	render() {
		return (
			<div className="main">
				<h1 className="main__heading">StudioME Analytics</h1>
				<ProductList displayProducts={this.displayProducts} />
				<ProductDetails productId={this.state.selected} />
				{/* <TestProducts /> */}
				<AddProduct />
			</div>
		)
	}
}

export default graphql(getProductsQuery)(App);