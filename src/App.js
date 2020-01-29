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
            const products = data.products.map(count => {
                return {
                    id: count.id,
                    name: count.name,
                    count: count.impressions.length
                }
            })

            let sortedProducts = products.sort((a, b) => (a.count > b.count) ? -1 : 1)
            console.log(sortedProducts)

            return sortedProducts.map((product, index) => {
                return (
                    <li
                        key={product.id}
                        onClick={(e) => {this.setState({selected: product.id})}}
                        className={product.id === this.state.selected ? "list__item--active" : "list__item"}
                    >
                        <span style={{marginRight: '10px', color: "#8DCBC0"}}>{index + 1})</span>{ product.name }
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