import React, { Component } from 'react';
import { graphql } from 'react-apollo';

// Queries
import { getProductsQuery } from '../queries/queries';

class ProductList extends Component {
    state = {

    }

    displayProducts = () => {
        let data = this.props.data;
        if (data.loading) {
            return( <div>Loading products...</div>);
        } else {
            return data.products.map(product => {
                return (
                    <li key={product.id}>{ product.name }</li>
                )
            })
        }
    }

    render() {
        return (
            <React.Fragment>
                <ul className="product-list">
                    {this.displayProducts()}
                </ul>
            </React.Fragment>
        )
    }
}

export default graphql(getProductsQuery)(ProductList);