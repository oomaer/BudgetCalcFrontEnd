import React, {Component} from 'react';
import CanvasJSReact from './lib/canvasjs.react';
let CanvasJSChart = CanvasJSReact.CanvasJSChart;


class PieChart extends Component {
	render() {
		const data = [
			{ y: 25, label: "Education" },
			{ y: 50, label: "Home and Living" },
			{ y: 10, label: "Travel" },
			{ y: 5, label: "Entertainment" },
			{ y: 8, label: "Other" },
			{ y: 2, label: "Savings" }
		]
		const options = {
			responsive: true,
			maintainAspectRatio: false,
			exportEnabled: true,
			animationEnabled: true,
			title: {
				text: "Where you spent this Month"
			},
			data: [{
				type: "pie",
				startAngle: 75,
				toolTipContent: "<b>{label}</b>: {y}%",
				showInLegend: "true",
				legendText: "{label}",
				indexLabelFontSize: 16,
				indexLabel: "{label} - {y}%",
				dataPoints: data
			}]
		}
		return (
		<div>
			<CanvasJSChart options = {options}/>
		
		</div>
		);
	}
}

  export default PieChart;