import XLSX from 'xlsx';
import fs from 'fs';

// Export 2-D Array data to excel or csv using SheetJS

// Convert excel sheet into json.
function excel_to_json() {
	const filePath = "excel/reports.xlsx",
		buf = fs.readFileSync(filePath),
		workbook = XLSX.read(buf, {type: 'buffer'});

	var result = {};
	workbook.SheetNames.forEach(function(sheetName) {
		var roa = XLSX.utils.sheet_to_json(
			workbook.Sheets[sheetName], 
			{
				header: 1,
				defval: ""
			}
		);
		if(roa.length) result[sheetName] = roa;
	});

	const result_in_json = JSON.stringify(result, null, 2);
	// console.log(result_in_json);
	// console.log("----------------------")

	fs.writeFileSync("output/reports.json", result_in_json);
}

// Create XLSX workbook to manipulate JSON data as Excel or CSV.
function createWorkBook() {
	const filePath = "output/reports.json",
		buffer = fs.readFileSync(filePath),
		data = JSON.parse(buffer);

	// console.log(data);

	const workbook = XLSX.utils.book_new(),
	 	worksheet = XLSX.utils.aoa_to_sheet(data);

	 XLSX.utils.book_append_sheet(workbook, worksheet);

	return workbook;
}

// Helper funtion to convert JSON to EXCEL
function json_to_excel() {
	const workbook = createWorkBook();

	XLSX.writeFile(workbook, "new-reports.xlsx", { bookType: "xlsx" });
}

// Helper funtion to convert JSON to CSV
function json_to_csv() {
	const workbook = createWorkBook();
	XLSX.writeFile(workbook, "new-reports.csv", { bookType: "csv"});

	// var result = [];
	// workbook.SheetNames.forEach((sheetName) => {
	//   const csv = XLSX.utils.sheet_to_csv(workbook.Sheets[sheetName]);
	//   if(csv.length > 0) {
	// 	result.push(csv);
	//   }
	// });

	// const csvString = result.join("\n");
	// fs.writeFileSync("output/reports.csv", csvString);
	
	// console.log("result: ", csvString);
}

json_to_excel();