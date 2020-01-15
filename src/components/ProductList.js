import React, { Component } from 'react';
import { graphql } from 'react-apollo';

// Components
import ProductDetails from './ProductDetails';

// Queries
import { getProductsQuery } from '../queries/queries';

class ProductList extends Component {
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
            <div className="list">
                <div className="list__container">
                    <h3 className="list__heading">Check Pressure Points:</h3>
                    <ul className="list__list">
                        {this.displayProducts()}
                    </ul>
                </div>
				<ProductDetails productId={this.state.selected} />
            </div>
        )
    }
}

export default graphql(getProductsQuery)(ProductList);