import React, {Component} from 'react';
import CanvasJSReact from './lib/canvasjs.react';
let CanvasJSChart = CanvasJSReact.CanvasJSChart;


class SplineChart extends Component {	
	render() {
        const income = [
            { y: 70000, label: "Jan" },
            { y: 70000, label: "Feb" },
            { y: 70000, label: "Mar" },
            { y: 80000, label: "Apr" },
            { y: 80000, label: "May" },
            { y: 80000, label: "Jun" },
            { y: 80000, label: "Jul" },
            { y: 80000, label: "Aug" },
            { y: 85000, label: "Sept" },
            { y: 100000, label: "Oct" },
            { y: 100000, label: "Nov" },
            { y: 100000, label: "Dec" }
        ]

        const budgets =  [
            { y: 60000, label: "Jan" },
            { y: 72000, label: "Feb" },
            { y: 69000, label: "Mar" },
            { y: 70000, label: "Apr" },
            { y: 75000, label: "May" },
            { y: 79000, label: "Jun" },
            { y: 83000, label: "Jul" },
            { y: 80000, label: "Aug" },
            { y: 80000, label: "Sept" },
            { y: 96000, label: "Oct" },
            { y: 90000, label: "Nov" },
            { y: 102000, label: "Dec" }
        ]

		const options = {
				animationEnabled: true,	
				title:{
					text: "Your Income Vs Budget"
				},
				axisY : {
					title: "Amount"
				},
				toolTip: {
					shared: true
				},
				data: [{
					type: "spline",
					name: "income",
					showInLegend: true,
					dataPoints: income
				},
				{
					type: "spline",
					name: "budget",
					showInLegend: true,
					dataPoints: budgets
				}]
		}
		
		return (
		<div>
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}
 
export default SplineChart;  