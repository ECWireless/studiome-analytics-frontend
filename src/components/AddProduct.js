import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';

// Queries
import { addProductQuery, getProductsQuery } from '../queries/queries';

class AddProduct extends Component {
    state = {
        name: null,
    }

    submitForm = (e) => {
        e.preventDefault();
        
        if (this.state.name == null) {
            return;
        } else {
            this.props.addProductQuery({
                variables: {
                    name: this.state.name,
                },
                refetchQueries: [{ query: getProductsQuery }]
            });
        }
    }

    render() {
        return (
            <div className="add">
                <h3 className="add__heading">Add a Pressure Point:</h3>
                <form className="add__form" onSubmit={this.submitForm.bind(this)}>
                    <label className="add__name-heading">Name:</label>
                    <input className="add__name" type="text" onChange={(e) => this.setState({ name: e.target.value })} />
                    <button className="add__button">+</button>
                </form>
            </div>
        )
    }
}

export default compose(
    graphql(addProductQuery, { name: "addProductQuery"}),
    graphql(getProductsQuery, { name: "getProductsQuery"})
)(AddProduct);