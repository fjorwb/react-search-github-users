import React from 'react';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.candy';
import FusionCharts from 'fusioncharts';
import Chart from 'fusioncharts/fusioncharts.charts';

// // Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

// STEP 2 - Chart Data

// STEP 3 - Creating the JSON object to store the chart configurations
const ChartComponent = ({ data }) => {
	const chartConfigs = {
		type: 'Doughnut2d', // The chart type
		width: '100%', // Width of the chart
		height: '400', // Height of the chart
		dataFormat: 'json', // Data type
		dataSource: {
			// Chart Configuration
			chart: {
				caption: 'Stars per Language',
				theme: 'candy',
				showPercentValues: '0',
				decimals: 2,
				doughnuRadius: '45%',
				paletteColors: '#FF0000, #0372AB, #FF5904',
			},
			// Chart Data
			data,
		},
	};
	return <ReactFC {...chartConfigs} />;
};

export default ChartComponent;
