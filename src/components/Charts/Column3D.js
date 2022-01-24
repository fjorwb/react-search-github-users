import React from 'react';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import FusionCharts from 'fusioncharts';
import Chart from 'fusioncharts/fusioncharts.charts';

// // Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

// STEP 2 - Chart Data

// STEP 3 - Creating the JSON object to store the chart configurations
const ChartComponent = ({ data }) => {
	const chartConfigs = {
		type: 'column3d', // The chart type
		width: '100%', // Width of the chart
		height: '400', // Height of the chart
		dataFormat: 'json', // Data type
		dataSource: {
			// Chart Configuration
			chart: {
				caption: 'Most Popular',
				yAxisName: 'Stars',
				xAxisName: 'Repos',
				xAxisNameFontSize: '16px',
				yAxisNameFontSize: '16px',
				theme: 'fusion',
				paletteColors: '#FF0000, #0372AB, #FF5904',
			},
			// Chart Data
			data,
		},
	};
	return <ReactFC {...chartConfigs} />;
};

export default ChartComponent;
