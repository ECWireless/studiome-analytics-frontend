import React, { Component } from 'react';

export default class ProductList extends Component {

    render() {
        return (
            <div className="list">
                <h3 className="list__heading">Select a Pressure Point:</h3>
                <div className="list__line" />
                <ul className="list__list">
                    {this.props.displayProducts()}
                </ul>
            </div>
        )
    }
}