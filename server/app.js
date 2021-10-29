const express = require('express');
const fs = require("fs");
const app = express();
const port = 3000;

app.get('/', (req, res) => {
	const parsedfile = parseCSVfile()
	res
		.set({'content-type': 'application/json; charset=utf-8'})
		.send({'data': parsedfile})
})

function parseCSVfile() {
	let readContents = fs
		.readFileSync("data.csv", {encoding: "utf8"})
		.toString()
		.split(/[;\r\n]/);  
	return readContents;
}

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})
