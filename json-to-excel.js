import fs from 'fs';

function getRawData() {
	const buffer = fs.readFileSync('output/reports.json')
	
	return JSON.parse(buffer);
}

function convert_to_csv() {
	const rawData = getRawData().People,
		csvString = rawData.map(e => e.join(',')).join('\n');

	fs.writeFileSync('output/reports.csv', csvString);
	console.log(csvString);
}

function convert_to_excel() {
 //TODO:	
}

convert_to_csv();