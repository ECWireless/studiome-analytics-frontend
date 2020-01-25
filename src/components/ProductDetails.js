import React, { Component } from 'react';
import { graphql } from 'react-apollo';

// Queries
import { getImpressionsQuery } from '../queries/queries';

class ProductDetails extends Component {

    state = {
        startDate: '',
        endDate: '',
        count: 0,
    }

    toNumber = (string) => {
        let newDate = Number(string.slice(0, 4) + string.slice(5, 7) + string.slice(8, 10));
        return newDate;
    }

    filterDates = () => {
        const { impressions } = this.props.data.product;

        const startDate = this.toNumber(this.state.startDate);
        const endDate = this.toNumber(this.state.endDate);
        let count = 0;

        for (let i = 0; i < impressions.length; i++) {
            if (startDate <= this.toNumber(impressions[i].date) && this.toNumber(impressions[i].date) <= endDate) {
                count++;
            }
        }

        this.setState({
            ...this.state,
            count: count,
        })
    }

    displayImpressions = () => {
        const { product } = this.props.data;

        if (product) {
            return(
                <React.Fragment>
                    <h3 className="details__heading">{product.name}</h3>
                    <div className="details__line" />
                    <label className="details__heading-start">Start Date:</label>
                    <input className="details__start-date" type="date" onChange={(e) => this.setState({startDate: e.target.value})} />

                    <label className="details__heading-end">End Date:</label>
                    <input className="details__end-date" type="date" onChange={(e) => this.setState({endDate: e.target.value})} />

                    <div className="details__total-headings">
                        <p>Total Impressions:</p>
                        <p>(since January)</p>
                    </div>
                    <div className="details__total">{product.impressions.length}</div>

                    <div className="details__heading-range">
                        <p>Impressions:</p>
                        <p>(within date range)</p>
                    </div>
                    <button className="details__button" onClick={this.filterDates}>Submit</button>

                    <p className="details__range-total">{this.state.count}</p>
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