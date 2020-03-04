import React, { Component } from 'react';
import { graphql } from 'react-apollo';

// Queries
import { getImpressionsQuery } from '../queries/queries';

// React Visualization
import {
    XYPlot,
    XAxis,
    YAxis,
    ChartLabel,
    HorizontalGridLines,
    VerticalGridLines,
    LineSeries,
    LineSeriesCanvas
  } from 'react-vis';

class ProductDetails extends Component {

    state = {
        startDate: '',
        endDate: '',
        count: 0,
        dateRange: [],
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
        let dateRange = [{x: startDate, y: 1}];

        for (let i = 0; i < impressions.length; i++) {
            if (startDate <= this.toNumber(impressions[i].date) && this.toNumber(impressions[i].date) <= endDate) {
                count++;
            }
        }

        let tempDate = startDate;
        let xAxis = 1 ;
        for (let i = startDate; i <  endDate; i++) {
            tempDate = tempDate + 1;
            xAxis = xAxis + 1;
            dateRange.push({x: tempDate, y: xAxis});
        }

        this.setState({
            ...this.state,
            count: count,
            dateRange, dateRange
        })
    }

    displayImpressions = () => {
        const { product } = this.props.data;
        const data = [
            {x: 1-2-20, y: 1},
            {x: 1-3-20, y: 4},
            {x: 1-4-20, y: 2},
            {x: 1-5-20, y: 1},
        ]

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

                    <XYPlot width={400} height={300}>
                        <HorizontalGridLines />
                        <VerticalGridLines />
                        <YAxis />
                        <ChartLabel 
                            text="Date"
                            className="alt-x-label"
                            includeMargin={false}
                            xPercent={0.025}
                            yPercent={1.01}
                            />

                        <ChartLabel 
                            text="Impressions"
                            className="alt-y-label"
                            includeMargin={false}
                            xPercent={0.06}
                            yPercent={0.06}
                            style={{
                            transform: 'rotate(-90)',
                            textAnchor: 'end'
                            }}
                            />
                        <LineSeries
                            stroke={'blue'}
                            strokeWidth={'5px'}
                            opacity={1}
                            data={data}
                        />
                    </XYPlot>
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