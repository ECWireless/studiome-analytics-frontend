import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';

// Queries
import { getProductsQuery, addImpressionQuery } from '../queries/queries';

class TestProducts extends Component {
    state = {
        date: null,
        productId: null,
    }

    onTodaysDate = () => {
        this.setState({
            ...this.state,
            date: new Date().toISOString().slice(0, 10),
        })
    }

    submitPressureTest = () => {
        if (this.state.date == null || this.state.productId == null) {
            return;
        } else {
            this.props.addImpressionQuery({
                variables: {
                    date: this.state.date,
                    productId: this.state.productId,
                },
            });
            window.location.reload(false);
        }
    }

    displayProducts = () => {
        let data = this.props.getProductsQuery;
        if (data.loading) {
            return(<div>Loading...</div>);
        } else {
            return(
                data.products.map(product => {
                    return(
                        <li
                            key={product.id}
                            onClick={(e) => this.setState({productId: product.id})}
                            className={product.id === this.state.productId ? "test__item--active" : "test__item"}
                        >{product.name}</li>)
                })
            );
        }
    }

    render() {
        return (
            <div className="test">
                <h3 className="test__heading">Test Pressure Points:</h3>
                <p className="test__points-heading">Pick a Pressure Point:</p>
                <ul className="test__points">
                    {this.displayProducts()}
                </ul>
                <label className="test__date-heading">Pick a test date:</label>
                <input
                    type="date"
                    onChange={(e) => this.setState({date: e.target.value})}
                    className="test__date"
                />
                <button onClick={this.submitPressureTest} className="test__button">Submit</button>
                <button onClick={this.onTodaysDate} className="test__button-2">Today's Date</button>
            </div>
        )
    }
}

export default compose(
    graphql(getProductsQuery, { name: "getProductsQuery"}),
    graphql(addImpressionQuery, { name: "addImpressionQuery" })
)(TestProducts);
