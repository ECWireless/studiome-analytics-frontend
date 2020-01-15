import React, { Component } from 'react';
import { graphql } from 'react-apollo';

// Queries
import { getImpressionsQuery } from '../queries/queries';

class ProductDetails extends Component {

    displayImpressions = () => {
        const { product } = this.props.data;

        if (product) {
            return(
                <React.Fragment>
                    <h3 className="details__heading">{product.name}</h3>
                    <p className="details__impressions-heading">All impressions by this pressure point:</p>
                    <ul className="details__impressions">
                        {
                            product.impressions.map(item => {
                                return <li key={item.id} className="details__item">{item.date}</li>
                            })
                        }
                    </ul>
                    <p className="details__total-heading">Total Impressions:</p>
                    <div className="details__total">{product.impressions.length}</div>
                </React.Fragment>
            )
        } else {
            return(
                <p className="details__unselected">No Pressure Point selected...</p>
            )
        }
    }

    render() {
        return (
            <div className="details">
                {this.displayImpressions()}
            </div>
        )
    }
}

export default graphql(getImpressionsQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.productId
            }
        }
    }
})(ProductDetails);